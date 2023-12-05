module.exports = {
    data: {
        name: 'interactionCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (interaction) {
            console.log(interaction.customId)
            if (!interaction.customId) return;
            const button = client.buttons.get(interaction.customId);
            console.log(button)
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