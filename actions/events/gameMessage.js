const config = require('../../config.json');

module.exports = {
    data: {
        name: 'messageCreate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if(await functions.getServerLanguage(functions, connection, message.guild.id) === 'BAN') { return console.log(`Server: ${message.guild.name} (${message.guild.id}) has been banned`)}      

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