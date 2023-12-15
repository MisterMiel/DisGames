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
                const language = await functions.getServerLanguage(functions, connection, interaction.guildId);
                const response = await functions.getLanguageMessage(client, functions, connection, 2, language)
                await interaction.reply({ content: response, ephemeral: true });
            }

        }
    }
}