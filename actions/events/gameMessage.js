const config = require('../../config.json');
module.exports = {
    data: {
        name: 'messageCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if (message.author.bot) return;

            const channels = await functions.runQuery(functions, connection, `SELECT * FROM games WHERE channelID = '${message.channel.id}'`);
            if(channels.length > 0) {
                const channel = channels[0];
                if(channel.type === 1) {
                    functions.runGame1(functions, connection, message, channel);
                }
                if(channel.type === 2) {
                    functions.runGame2(functions, connection, message, channel);
                }
                if(channel.type === 3) {
                    functions.runGame3(functions, connection, message, channel);
                }
                if(channel.type === 4) {
                    functions.runGame4(functions, connection, message, channel);
                }
                if(channel.type === 5) {
                    functions.runGame5(functions, connection, message, channel);
                }
                if(channel.type === 6) {
                    functions.runGame6(functions, connection, message, channel);
                }
                if(channel.type === 7) {
                    functions.runGame7(functions, connection, message, channel);
                }
                if(channel.type === 8) {
                    functions.runGame8(functions, connection, message, channel);
                }
            }

        }
    }
}