module.exports = {
    data: {
        name: 'guildCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (guild) {
            functions.createServer(client, functions, connection, guild.id);
        }
    }
}