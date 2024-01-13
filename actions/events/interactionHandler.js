const { PermissionsBitField } = require('discord.js');


module.exports = {
    data: {
        name: 'interactionCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {     
            if(await functions.getServerLanguage(functions, connection, message.guild.id) === 'BAN') { return console.log(`Server: ${message.guild.name} (${message.guild.id}) has been banned`)}      
            if (!message.commandName) return;
            const command = client.commands.get(message.commandName);
            if (!command) return;
            if(!message.guildId) return message.reply({ content: 'This command is not available in DMs', ephemeral: true });
            const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.ManageMessages)
            if (permission || command.data.permission === 0) {
                try {
                    await command.run(client, functions, connection, message);
                } catch (error) {
                    functions.createLog(`${command.data.name} (SLASH) | ${error}`, true, false);
                    const language = await functions.getServerLanguage(functions, connection, message.guild.id);
                    const response = await functions.getLanguageMessage(client, functions, connection, 2, language)
                    await message.reply({ content: response, ephemeral: true });
                }
            }

        }
    }
}