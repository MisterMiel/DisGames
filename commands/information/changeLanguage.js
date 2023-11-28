module.exports = {
    data: {
        name: 'changelanguage',
        message: false,
        options: [
            {
                name: "language",
                description: "The language you want to change to",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "English",
                        value: "EN"
                    },
                    {
                        name: "Dutch",
                        value: "NL"
                    },
                    {
                        name: "Spanish",
                        value: "ES"
                    },
                    {
                        name: "German",
                        value: "GE"
                    }
                ]
            }
        ],
        description: "A minigame",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {
        const language = message.options.getString("language");
        const response = await functions.getLanguageMessage(client, functions, connection, 3, language);
        message.reply(response);
    }
}