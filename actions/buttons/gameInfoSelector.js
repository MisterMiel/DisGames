module.exports = {
    data: {
        name: 'gameInfoSelector'
    },
    run: async function (client, functions, connection, button) {
        const game = button.values[0];
        const language = await functions.getServerLanguage(client, functions, connection, button.guildId);
        const games = await functions.games;
        console.log(games)
        const gameId = await functions.runQuery(functions, connection, `SELECT * FROM game_types WHERE ID = "${game}"`);

        const gameData = gameId[0];
        const response = await functions.getLanguageMessage(client, functions, connection, gameData.description, language, null)
        const responseTwo = await functions.getLanguageMessage(client, functions, connection, gameData.gameRules, language, null)

        const embed = await functions.createEmbed(functions, "Test", `**Objective:** ${response}\n**Rules:** ${responseTwo}`, null);
        const channel = await client.channels.cache.get(button.channelId);
        button.deferUpdate();
        channel.messages.fetch(button.message.id).then(msg => {
            msg.edit({ embeds: [embed] });
        });
    }
}