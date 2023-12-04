module.exports = {
    data: {
        name: 'setupgame',
        message: true,
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

        const result = await functions.runQuery(functions, connection, `SELECT * FROM games WHERE channelID = '${message.channel.id}'`, true);
        if (result.length > 0) {
            return message.reply("There is already a game in this channel")
        } else {
            const type = parseInt(message.options.getString("mode"));

            functions.runGame(functions, connection, type, message);

        }


    }
}