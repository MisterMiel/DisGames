module.exports = {
    data: {
        name: 'interactionCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (interaction) {
            if (!interaction.customId) return;
            const button = client.buttons.get(interaction.customId);
            if (!button) return;

            try {
                await button.run(client, functions, connection, interaction);
            } catch (error) {
                functions.createLog(`${button.data.name} (SLASH) | ${error}`, true, false);
                await interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
            }

        }
    }
}