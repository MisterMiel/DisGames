const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: {
        name: 'disablegame',
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
                        name: "👥 Trivia",
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
        description: "Disable a game for the entire server",
        permissions: PermissionsBitField.Flags.ManageGuild,
    },
    run: async function (client, functions, connection, message) {
        const type = parseInt(message.options.getString("mode"));
        const language = await functions.getServerLanguage(functions, connection, message.guild.id);
        
        await functions.runQuery(functions, connection, `DELETE FROM games WHERE serverID = '${message.guild.id}' AND type = ${type}`);
        
        const response = await functions.getLanguageMessage(client, functions, connection, 5, language);
        return message.reply({ content: response });
    }
}; 