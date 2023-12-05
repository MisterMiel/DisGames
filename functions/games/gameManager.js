const { PermissionsBitField } = require('discord.js');
module.exports.getGameRules = async (client, functions, connection, gameID) => {
    return 'No message set for this language.';
}

module.exports.runGame = async (functions, connection, type, message, result) => {
    const language = await functions.getServerLanguage(functions, connection, message.guild.id)
    const data = await functions.runQuery(functions, connection, `SELECT * FROM game_data LEFT JOIN game_types ON game_data.gameID = game_types.ID WHERE languageID = '${language}' AND gameID = '${type}' ORDER BY RAND() LIMIT 1`);
    const game = data[0];

    if (type === 1 && result !== undefined) { game.response = parseInt(result.response) + 1; }
    if (type === 2 && result !== undefined) { game.response = message.content.charAt(message.content.length - 1).toLowerCase(); }
    if (type === 3) { const anagram = await functions.createAnagram(functions, connection, game.response); game.message = anagram; }

    if (result === undefined) {
        const embed = await functions.createEmbed(functions, game.gameName, "Hier uitleg game", game.picture);

        message.reply({ embeds: [embed] }, { ephemeral: true })
        if (game.replyMessage == 1) message.channel.send({ embeds: [embed] })
        const insertedGame = await functions.runQuery(functions, connection, "INSERT INTO `games` (`channelID`, `serverID`, `type`, `response`) VALUES ('" + message.channel.id + "', '" + message.guild.id + "', '" + type + "', '" + game.response + "')");
    } else {
        const embed = await functions.createEmbed(functions, game.gameName, game.message, game.picture);

        if (result.lastUser === message.author.id && game.sameUserAllowed === 0) {
            functions.createLog("Deleting message from same user", false, true);
            //const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.ManageMessages)
            const permission = true;
            if (permission) {
                message.delete(message.id).catch(err => { functions.createLog(err, true, false) });
            } else { message.channel.send({ content: "Permissions of the bot are not set correctly. Please contact a server administrator." }) }
            return;
        }

        if (type === 4) {
            if (parseInt(message.content) > parseInt(result.response)) {
                functions.reactMessage(functions, message, "🔽");
            } else if (parseInt(message.content) < parseInt(result.response)) {
                functions.reactMessage(functions, message, "🔼");
            } else {
                functions.reactMessage(functions, message, "✅");
                game.response = Math.floor(Math.random() * 10000) + 1;
                message.channel.send({ content: "correct" })
                functions.runQuery(functions, connection, "UPDATE `games` SET `response` = '" + game.response + "', `lastUser` = '" + message.author.id + "', `messageID` = '" + message.id + "' WHERE `channelID` = '" + message.channel.id + "'");
            }
        } else if (result.response.toLowerCase() === message.content.toLowerCase() || (type === 2 && result.response.toLowerCase() === message.content.charAt(0).toLowerCase())) {
            functions.reactMessage(functions, message, "✅");
            var gameSQL = "";
            if (game.replyMessage == 1) message.channel.send({ embeds: [embed] })
            if (game.sameUserAllowed === 0 || game.allowMessageChange === 0) { gameSQL = ", `lastUser` = '" + message.author.id + "', `messageID` = '" + message.id + "'"; };
            functions.runQuery(functions, connection, "UPDATE `games` SET `response` = '" + game.response + "' " + gameSQL + " WHERE `channelID` = '" + message.channel.id + "'");
        }
    }
}
