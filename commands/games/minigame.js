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
            if(type == 1) {
                const game = functions.runGame1(functions, connection, message);
            }
            if(type == 2) {
                const game = functions.runGame2(functions, connection, message);
            }
            if(type == 3) {
                const game = functions.runGame3(functions, connection, message);
            }
            if(type == 4) {
                const game = functions.runGame4(functions, connection, message);
            }
            if(type == 5) {
                const game = functions.runGame5(functions, connection, message);
            }
            if(type == 6) {
                const game = functions.runGame6(functions, connection, message);
            }
            if(type == 7) {
                const game = functions.runGame7(functions, connection, message);
            }
            if(type == 8) {
                const game = functions.runGame8(functions, connection, message);
            }
            //message.reply("This is a minigame");
        }


    }
}