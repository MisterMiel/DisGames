module.exports = {
    data: {
        name: 'guildCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (guild) {
            if(await functions.getServerLanguage(functions, connection, guild.id) === 'BAN') { return console.log(`Server: ${message.guild.name} (${message.guild.id}) has been banned`)}      

            functions.createLog(`Joined new server: ${guild.name} (${guild.id})`, false, false);
            functions.createServer(client, functions, connection, guild.id);
        }
    }
}