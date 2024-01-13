const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: {
        name: 'games',
        message: false,
        options: [],
        description: "A minigame",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {
        const games = functions.games;

        const transformedOptions = games
            .filter(rowData => rowData.gameDisabled !== 1)
            .map(async (rowData) => {
                const emojiMap = {
                    'Count': '🔢',
                    'Snake': '🐍',
                    'Anagram': '📋',
                    'Arrow Guesser': '🔼',
                    'Trivia': '👥',
                    'Price Guesser': '💍',
                    'Math Challenge': '📊',
                    'Guess the Flag': '🚩',
                };

                const emoji = emojiMap[rowData.gameName] || '❓';
                const description = await functions.getLanguageMessage(client, functions, connection, rowData.description, 'EN') || 'No description provided';
                return new StringSelectMenuOptionBuilder()
                    .setLabel(`${emoji} ${rowData.gameName}`)
                    .setDescription(description)
                    .setValue(rowData.ID.toString());
            });
        const options = await Promise.all(transformedOptions);
        const language = await functions.getServerLanguage(functions, connection, message.guild.id);
        const description = await functions.getLanguageMessage(client, functions, connection, 7, language)

        const dropdown = new StringSelectMenuBuilder()
            .setCustomId('gameInfoSelector')
            .setPlaceholder(description)
            .addOptions(options);
        const row = new ActionRowBuilder()
            .addComponents(dropdown);
        const response = await functions.getLanguageMessage(client, functions, connection, 8, language)
        const embed = await functions.createEmbed(functions, "Minigames", response, null);
        const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.SendMessages)
        if (permission) {
            //TODO: send command user a message with the error
            const msg = await message.reply({ embeds: [embed], components: [row], fetchReply: true });
        } else {
            const noPerms = await functions.getLanguageMessage(null, functions, connection, 3, language)
            console.log(noPerms)
        }

    }
}