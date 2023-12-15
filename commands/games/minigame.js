module.exports = {
    data: {
        name: 'setupgame',
        message: false,
        options: [
            {
                name: "mode",
                description: "Game mode",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "🔢 Count",
                        value: "1"
                    },
                    {
                        name: "🐍 Snake",
                        value: "2"
                    },
                    {
                        name: "📋 Anagram",
                        value: "3"
                    },
                    {
                        name: "🔼 Arrow Guesser",
                        value: "4"
                    },
                    {
                        name: "👥 Age Guesser",
                        value: "5"
                    },
                    {
                        name: "💍 Price Guesser",
                        value: "6"
                    },
                    {
                        name: "📊 Math Challenge",
                        value: "7"
                    },
                    {
                        name: "🚩 Guess the Flag",
                        value: "8"
                    }
                ]
            }
        ],
        description: "A minigame",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {

        const result = await functions.runQuery(functions, connection, `SELECT * FROM games WHERE channelID = '${message.channel.id}'`);
        const language = await functions.getServerLanguage(functions, connection, message.guild.id);
        if (result.length > 0) {
            const response = await functions.getLanguageMessage(client, functions, connection, 10, language)
            await functions.runQuery(functions, connection, `DELETE FROM games WHERE channelID = '${message.channel.id}'`);
            return message.reply({ content: response })
        } else {
            const type = parseInt(message.options.getString("mode"));
            const gameData = await functions.runQuery(functions, connection, `SELECT * FROM games WHERE serverID = '${message.guild.id}' AND type = '${type}'`, true);
            if(gameData.length > 0) {
                const response = await functions.getLanguageMessage(client, functions, connection, 6, language)
                return message.reply({ content: response })
            }
            functions.runGame(functions, connection, type, message);

        }


    }
}