require("dotenv").config();
module.exports = {
    data: {
        name: 'messageCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            
            if(message.channel.type === 'DM') return;
            functions.createServer(client, functions, connection, message.guild.id);
            if(await functions.getServerLanguage(functions, connection, message.guild.id) === 'BAN') { return console.log(`Server: ${message.guild.name} (${message.guild.id}) has been banned`)}      

            if (message.author.bot) return;

            const commandName = message.content.split(process.env.PREFIX)[1];
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