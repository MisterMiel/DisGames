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
        const languageNames = {
            'EN': 'English',
            'NL': 'Dutch',
            'ES': 'Spanish',
            'GE': 'German'
        };
        const language = message.options.getString("language");
        const languageName = languageNames[language];

        if(language == 'ES' || language == 'GE') return message.reply("This language is not yet supported");
    
        const response = await functions.getLanguageMessage(client, functions, connection, 12, language, { LANGUAGE: languageName, GUILD: message.guild.name });
        message.reply(response);
        const server = await functions.updateServerLanguage(functions, connection, message.guild.id, language);

    }
}