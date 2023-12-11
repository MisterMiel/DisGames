module.exports = {
    data: {
        name: 'profileInfoSelector'
    },
    run: async function (client, functions, connection, button) {
        const game = button.values[0];
        const language = await functions.getServerLanguage(functions, connection, button.guildId);
        const games = await functions.runQuery(functions, connection, `SELECT * FROM points ` );
        const gameData = games[0];

        const response = await functions.getLanguageMessage(client, functions, connection, gameData.description, language)
        const responseTwo = await functions.getLanguageMessage(client, functions, connection, gameData.gameRules, language)

        const embed = await functions.createEmbed(functions, `${gameData.gameName}`, `**Objective:** ${response}\n**Rules:** ${responseTwo}`, null);
        const channel = await client.channels.cache.get(button.channelId);
        button.deferUpdate();
        channel.messages.fetch(button.message.id).then(msg => {
            msg.edit({ embeds: [embed] });
        });
    }
}