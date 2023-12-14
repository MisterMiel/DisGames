module.exports = {
    data: {
        name: 'interactionCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if (!message.commandName) return;
            const command = client.commands.get(message.commandName);
            if (!command) return;

            try {
                await command.run(client, functions, connection, message);
            } catch (error) {
                functions.createLog(`${command.data.name} (SLASH) | ${error}`, true, false);
                const language = await functions.getServerLanguage(functions, connection, message.guild.id);
                const response = await functions.getLanuageMessage(client, functions, connection, 2, language)
                await message.reply({ content: response, ephemeral: true });
            }

        }
    }
}