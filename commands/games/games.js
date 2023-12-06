const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
module.exports = {
    data: {
        name: 'games',
        message: true,
        options: [],
        description: "A minigame",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {
        const options = [
            new StringSelectMenuOptionBuilder()
                .setLabel('🔢 Count')
                .setDescription('Test')
                .setValue('1'),
        
            new StringSelectMenuOptionBuilder()
                .setLabel('🐍 Snake')
                .setDescription('Test')
                .setValue('2'),
        
            new StringSelectMenuOptionBuilder()
                .setLabel('📋 Anagram')
                .setDescription('Test')
                .setValue('3'),
        
            new StringSelectMenuOptionBuilder()
                .setLabel('🔼 Arrow Guesser')
                .setDescription('Test')
                .setValue('4'),
        
            new StringSelectMenuOptionBuilder()
                .setLabel('👥 Age Guesser')
                .setDescription('Test')
                .setValue('5'),
        
            new StringSelectMenuOptionBuilder()
                .setLabel('💍 Price Guesser')
                .setDescription('Test')
                .setValue('6'),
        
            new StringSelectMenuOptionBuilder()
                .setLabel('📊 Math Challenge')
                .setDescription('Test')
                .setValue('7'),
        
            new StringSelectMenuOptionBuilder()
                .setLabel('🚩 Guess the Flag')
                .setDescription('Test')
                .setValue('8'),
        ];
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