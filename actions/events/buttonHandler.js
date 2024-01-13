module.exports = {
    data: {
        name: 'interactionCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (interaction) {
            if(await functions.getServerLanguage(functions, connection, interaction.guild.id) === 'BAN') { return console.log(`Server: ${interaction.guild.name} (${interaction.guild.id}) has been banned`)}      

            if (!interaction.customId) return;
            const button = client.buttons.get(interaction.customId);
            if (!button) return;

            try {
                await button.run(client, functions, connection, interaction);
            } catch (error) {
                functions.createLog(`${button.data.name} (BUTTON) | ${error}`, true, false);
                const language = await functions.getServerLanguage(functions, connection, interaction.guildId);
                const response = await functions.getLanguageMessage(client, functions, connection, 2, language)
                await interaction.reply({ content: response, ephemeral: true });
            }

        }
    }
}