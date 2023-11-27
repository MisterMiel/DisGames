const config = require('../../config.json');
module.exports = {
    data: {
        name: 'messageCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if (message.author.bot) return;
            const commandName = message.content.slice(config['Prefix'].length).trim().split(/ +/).shift().toLowerCase();
            const command = client.commands.get(commandName);

            if (!command) return;
            functions.createLog(`Command ${commandName} was executed`, false, true)
            console.log(command.data);
            if(command.data.message === false) return;
            try {
                await command.run(client, functions, connection, message);
            } catch (error) {
                console.error(error);
                await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
}