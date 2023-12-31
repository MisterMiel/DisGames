const config = require('../../config.json');

module.exports = {
    data: {
        name: 'messageCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if (message.author.bot) return;

            const channels = await functions.runQuery(functions, connection, `SELECT * FROM games WHERE channelID = '${message.channel.id}'`, false);
            if(channels.length > 0) {
                const channel = channels[0];
                const user = await functions.createUser(functions, connection, message.author.id)

                functions.runGame(functions, connection, channel.type, message, channel);

            }

        }
    }
}