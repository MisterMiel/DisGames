module.exports = {
    data: {
        name: 'interactionCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            const command = client.commands.get(message.commandName);
            if (!command) return;

            try {
                await command.run(client, functions, connection, message);
            } catch (error) {
                functions.createLog(`${command.data.name} (SLASH) | ${error}`, true, false);
                await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

        }
    }
}