module.exports = {
    data: {
        name: 'profileInfoSelector'
    },
    run: async function (client, functions, connection, button) {
        const user = await client.embeds.get(button.message.id);
        const language = await functions.getServerLanguage(functions, connection, button.guildId);
        if (!user || user !== button.user.id) {
            const response = await functions.getLanguageMessage(client, functions, connection, 9, language)
            await button.reply({ content: response, ephemeral: true });
            return;
        }
        const game = button.values[0];
        const games = await functions.runQuery(functions, connection, `SELECT *, SUM(points) as total_points, RANK() OVER (ORDER BY SUM(points) DESC) AS global_position, RANK() OVER (ORDER BY points DESC) AS server_position
        FROM points
        WHERE gameID = ${game}
        GROUP BY userID, serverID
        ORDER BY global_position;`);
        let gameData;
        let embed;

        if (games.length >= 1) {
            const gameName = functions.games[game - 1].gameName;
            const emojiMap = {
                'Count': '🔢',
                'Snake': '🐍',
                'Anagram': '📋',
                'Arrow Guesser': '🔼',
                'Age Guesser': '👥',
                'Price Guesser': '💍',
                'Math Challenge': '📊',
                'Guess the Flag': '🚩',
            };
            const emoji = emojiMap[gameName] || '❓';

            gameData = games.find(game => game.userID === button.user.id);
            if (gameData !== undefined) {
                const globalPoints = await functions.getLanguageMessage(client, functions, connection, 28, language)
                const serverPoints = await functions.getLanguageMessage(client, functions, connection, 29, language, { GUILD: button.guild.name })
                const globalPosition = await functions.getLanguageMessage(client, functions, connection, 30, language)
                const serverPosition = await functions.getLanguageMessage(client, functions, connection, 31, language, { GUILD: button.guild.name })

                embed = await functions.createEmbed(functions, `${emoji} ${gameName}`, '**GLOBAL INFORMATION:**\n```' + `${globalPoints}: ${gameData.total_points}` + '``````' + `${globalPosition}: ${gameData.global_position}` + '```\n**SERVER INFORMATION:**\n```' + `${serverPoints}: ${gameData.points}` + '``````' + `${serverPosition}: ${gameData.server_position}` + '```', null);
            } else {
                const description = await functions.getLanguageMessage(client, functions, connection, 4, language)
                embed = await functions.createEmbed(functions, `${emoji} ${gameName}`, description, null);
            }
        } else {
            const description = await functions.getLanguageMessage(client, functions, connection, 4, language)
            embed = await functions.createEmbed(functions, `${functions.games[game - 1].gameName}`, description, null);
        }
        const channel = await client.channels.cache.get(button.channelId);
        button.deferUpdate();

        await channel.messages.fetch(button.message.id).then(msg => {
            msg.edit({ embeds: [embed] });
        });
    }
}