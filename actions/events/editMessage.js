const config = require('../../config.json');
module.exports = {
    data: {
        name: 'messageUpdate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if (message.author.bot) return;

            const channels = await functions.runQuery(functions, connection, `SELECT * FROM games LEFT JOIN game_types ON games.type = game_types.ID WHERE channelID = "${message.channel.id}"`);
            if (channels.length > 0) {
                const channel = channels[0];
                if (message.id === channel.messageID && channel.allowMessageChange === 0) {
                    functions.createLog("Deleting message from same user", false, true);
                    var permission = true;
                    if (permission) {
                        message.delete(message.id).catch(err => { functions.createLog(err, true, false) });
                        message.channel.send({ content: `**${message.author.username}:** ${message.content}` })
                    } else { 
                        const language = await functions.getServerLanguage(functions, connection, message.guild.id);
                        const response = await functions.getLanuageMessage(client, functions, connection, 3, language)
                        message.channel.send({ content: "Permissions of the bot are not set correctly. Please contact a server administrator." }) 
                    }
                    return;
                }
            }

        }
    }
}