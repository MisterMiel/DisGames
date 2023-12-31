module.exports = {
    data: {
        name: 'guildCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (guild) {
            functions.createLog(`Joined new server: ${guild.name} (${guild.id})`, false, false);
            functions.createServer(client, functions, connection, guild.id);
        }
    }
}