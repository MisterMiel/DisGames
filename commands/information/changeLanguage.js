const { PermissionsBitField } = require('discord.js');

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
        permissions: PermissionsBitField.Flags.ManageMessages,
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
        const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.SendMessages)
        if (permission) {
            //TODO: send command user a message with the error
            message.reply(response);
        } else {
            const noPerms = await functions.getLanguageMessage(null, functions, connection, 3, language)
            console.log(noPerms)
        }
        const server = await functions.updateServerLanguage(functions, connection, message.guild.id, language);

    }
}