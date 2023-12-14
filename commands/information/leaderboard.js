const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'disabled',
        message: false,
        options: [],
        description: "A minigame",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {
        const actionRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Next Page")
                .setCustomId("nextpage")
                .setStyle(1),
        );
        const embed = await functions.createEmbed(functions, "Test", "Test", null);
        const msg = await message.channel.send({ embeds: [embed], components: [actionRow] });
    }
}