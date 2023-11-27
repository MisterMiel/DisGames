module.exports = {
    data: {
        name: 'changelanguage',
        message: false,
        options: [
            {
                name: "language",
                description: "The language you want to change to",
                type: "STRING",
                required: true,
                choices: [
                    {
                        name: "English",
                        value: 1
                    },
                    {
                        name: "Dutch",
                        value: 2
                    }
                ]
            }
        ],
        description: "A minigame",
        permissions: [],
    },
    run: function (client, functions, connection, message) {
        message.reply("This is a minigame");
    }
}