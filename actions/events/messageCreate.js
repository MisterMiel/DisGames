const config = require('../../config.json');
module.exports = {
    data: {
        name: 'messageCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if(message.channel.type === 'DM') return;
            functions.createServer(client, functions, connection, message.guild.id);

            if (message.author.bot) return;

            const commandName = message.content.split(config['Prefix'])[1];
            const command = client.commands.get(commandName);

            if (!command) return;
            functions.createLog(`Command ${commandName} was executed`, false, true)

            if(command.data.message === false) return;
            try {
                await command.run(client, functions, connection, message);
            } catch (error) {
                functions.createLog(`${command.data.name} (MESSAGE) | ${error}`, true, false);
                await message.reply({ content: 'There was an error while executing this command! Please try to use /' + command.data.name, ephemeral: true });
            }
        }
    }
}