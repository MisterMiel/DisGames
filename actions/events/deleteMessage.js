const config = require('../../config.json');
module.exports = {
    data: {
        name: 'messageDelete',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if(await functions.getServerLanguage(functions, connection, message.guild.id) === 'BAN') { return console.log(`Server: ${message.guild.name} (${message.guild.id}) has been banned`)}      


            if (message.author.bot) return;

            const channels = await functions.runQuery(functions, connection, `SELECT * FROM games LEFT JOIN game_types ON games.type = game_types.ID WHERE channelID = "${message.channel.id}"`);
            if(channels.length > 0) {
                const channel = channels[0];
                if(message.id === channel.messageID && channel.allowMessageChange === 0) { 
                    if(message.editedTimestamp !== null) return;
                    message.channel.send({ content: `**${message.author.username}:** ${message.content}`})
                }
            }

        }
    }
}