const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: {
        name: 'messageUpdate',
        type: 'on',
    },
    run: function (client, functions, connection) {
        return async function (message) {
            if(await functions.getServerLanguage(functions, connection, message.guild.id) === 'BAN') { return console.log(`Server: ${message.guild.name} (${message.guild.id}) has been banned`)}      

            if (message.author.bot) return;

            const channels = await functions.runQuery(functions, connection, `SELECT * FROM games LEFT JOIN game_types ON games.type = game_types.ID WHERE channelID = "${message.channel.id}"`);
            if (channels.length > 0) {
                const channel = channels[0];
                if (message.id === channel.messageID && channel.allowMessageChange === 0) {
                    functions.createLog("Deleting message from same user", false, true);
                    const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.ManageMessages)
                    if (permission) {
                        message.delete(message.id).catch(err => { functions.createLog(err, true, false) });
                        message.channel.send({ content: `**${message.author.username}:** ${message.content}` })
                    } else { 
                        const language = await functions.getServerLanguage(functions, connection, message.guild.id);
                        const response = await functions.getLanguageMessage(client, functions, connection, 3, language)
                        message.channel.send({ content: response }) 
                    }
                    return;
                }
            }

        }
    }
}