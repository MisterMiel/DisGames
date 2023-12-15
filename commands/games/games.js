const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
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
                    'Age Guesser': '👥',
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
        const dropdown = new StringSelectMenuBuilder()
            .setCustomId('gameInfoSelector')
            .setPlaceholder('Make a selection!')
            .addOptions(options);
        const row = new ActionRowBuilder()
            .addComponents(dropdown);
        const embed = await functions.createEmbed(functions, "Minigames", "Choose a minigame to play", null);
        const msg = await message.channel.send({ embeds: [embed], components: [row] });

    }
}