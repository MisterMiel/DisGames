const { PermissionsBitField } = require('discord.js');

const games = [];
const regex = /^[A-Za-z]+$/;

module.exports.getAllGameRules = async (client, functions, connection) => {
    functions.createLog("Fetching all games", false, true);
    const data = await functions.runQuery(functions, connection, 'SELECT * FROM game_types');
    for (let i = 0; i < data.length; i++) {
        games.push(data[i]);
    }
    return true;
}

module.exports.games = games;

module.exports.runGame = async (functions, connection, type, message, result) => {
    //TODO: Add new game data



    //TODO: (ERROR) [1/7/2024, 5:51:49 PM] Query Output
    // [
    //     RowDataPacket {
    //       channelID: '1090211397109022830',
    //       serverID: '1063897173076484146',
    //       type: 2,
    //       response: 'r',
    //       lastUser: '1063895947777687714',
    //       messageID: '1193597101507084339'
    //     }
    //   ]
    let addSQL = "";
    const language = await functions.getServerLanguage(functions, connection, message.guild.id)
    if (type == 3 || type == 5 || type == 7) addSQL = `languageID = '${language}' AND`;
    const data = await functions.runQuery(functions, connection, `SELECT * FROM game_data LEFT JOIN game_types ON game_data.gameID = game_types.ID WHERE ${addSQL} gameID = '${type}' ORDER BY RAND() LIMIT 1`, false);
    const game = data[0];
    if (game.gameDisabled === 1) {
        const response = await functions.getLanguageMessage(null, functions, connection, 5, language)
        return message.reply({ content: response })
    };
    if (type === 1 && result !== undefined) { game.response = parseInt(result.response) + 1; }
    if (type === 2 && result !== undefined) { game.response = message.content.charAt(message.content.length - 1).toLowerCase(); }
    if (type === 2) { game.message = await functions.getLanguageMessage(null, functions, connection, parseInt(game.message), language); }
    if (type === 3) { const anagram = await functions.createAnagram(functions, connection, game.response); game.message = "```" + anagram + "```"; }
    if (type === 4) { game.message = await functions.getLanguageMessage(null, functions, connection, game.gameRules, language) }
    if (type === 8) { game.picture = `https://www.worldometers.info/img/flags/${game.picture}` }

    if (result === undefined) {
        const description = await functions.getLanguageMessage(null, functions, connection, game.description, language)
        const skipGame = await functions.getLanguageMessage(null, functions, connection, 27, language)
        if (game.message === null) game.message = "";
        const embed = await functions.createEmbed(functions, game.gameName, `${description}\n${game.message}`, game.picture);
        if (game.sameUserAllowed === 1) { embed.setFooter({ text: skipGame }) }
        const response = await functions.getLanguageMessage(null, functions, connection, 11, language)
        const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.SendMessages)
        if (permission) {
            //TODO: send command user a message with the error
            await message.reply({ content: response, ephemeral: true })
            await message.channel.send({ embeds: [embed] })
            const insertedGame = await functions.runQuery(functions, connection, "INSERT INTO `games` (`channelID`, `serverID`, `type`, `response`) VALUES ('" + message.channel.id + "', '" + message.guild.id + "', '" + type + "', '" + game.response + "')", false);
        } else {
            const noPerms = await functions.getLanguageMessage(null, functions, connection, 3, language)
            console.log(noPerms)
        }

    } else {
        const embed = await functions.createEmbed(functions, game.gameName, game.message, game.picture);
        if (game.sameUserAllowed === 1) {
            const skipGame = await functions.getLanguageMessage(null, functions, connection, 27, language)
            embed.setFooter({ text: skipGame })

            if (message.content.toLowerCase() === "?") {
                const footerMessage = functions.getLanguageMessage(null, functions, connection, 27, language)
                if (game.replyMessage == 1) message.channel.send({ embeds: [embed] })
                functions.runQuery(functions, connection, "UPDATE `games` SET `response` = '" + game.response + "' WHERE `channelID` = '" + message.channel.id + "'", false);
            }
        }
        if (result.lastUser === message.author.id && game.sameUserAllowed === 0) {
            functions.createLog("Deleting message from same user", false, true);
            const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.ManageMessages)
            if (permission) {
                message.delete(message.id).catch(err => { functions.createLog(err, true, false) });
            } else {
                const noPerms = await functions.getLanguageMessage(null, functions, connection, 3, language)
                message.channel.send({ content: noPerms })
            }
            return;
        }

        if (type === 4) {
            if (!isNaN(message.content)) {
                if (parseInt(message.content) > parseInt(result.response)) {
                    functions.reactMessage(functions, message, "🔽");
                    functions.runQuery(functions, connection, "UPDATE `games` SET  `lastUser` = '" + message.author.id + "', `messageID` = '" + message.id + "' WHERE `channelID` = '" + message.channel.id + "'", false);

                } else if (parseInt(message.content) < parseInt(result.response)) {
                    functions.reactMessage(functions, message, "🔼");
                    functions.runQuery(functions, connection, "UPDATE `games` SET  `lastUser` = '" + message.author.id + "', `messageID` = '" + message.id + "' WHERE `channelID` = '" + message.channel.id + "'", false);

                } else {
                    functions.reactMessage(functions, message, "✅");
                    game.response = Math.floor(Math.random() * 10000) + 1;

                    const response = await functions.getLanguageMessage(null, functions, connection, 33, language)
                    message.channel.send({ content: response })
                    functions.runQuery(functions, connection, "UPDATE `games` SET `response` = '" + game.response + "', `lastUser` = '" + message.author.id + "', `messageID` = '" + message.id + "' WHERE `channelID` = '" + message.channel.id + "'", false);
                    functions.createNewStat(functions, connection, type);

                    await functions.setGamePoints(functions, connection, type, message.author.id, message.guild.id);
                }
            } else {
                const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.ManageMessages)
                if (permission) {
                    message.delete(message.id).catch(err => { functions.createLog(err, true, false) });
                } else {
                    const noPerms = await functions.getLanguageMessage(null, functions, connection, 3, language)
                    message.channel.send({ content: noPerms })
                }
            }
        } else if (result.response.toLowerCase() === message.content.toLowerCase() || (type === 2 && result.response.toLowerCase() === message.content.charAt(0).toLowerCase() && regex.test(message.content))) {
            functions.reactMessage(functions, message, "✅");
            var gameSQL = "";
            if (game.replyMessage == 1) message.channel.send({ embeds: [embed] })
            if (game.sameUserAllowed === 0 || game.allowMessageChange === 0) { gameSQL = ", `lastUser` = '" + message.author.id + "', `messageID` = '" + message.id + "'"; };
            functions.runQuery(functions, connection, "UPDATE `games` SET `response` = '" + game.response + "' " + gameSQL + " WHERE `channelID` = '" + message.channel.id + "'", false);
            functions.createNewStat(functions, connection, type);

            await functions.setGamePoints(functions, connection, type, message.author.id, message.guild.id);
        } else if (type === 1 || type === 2) {
            const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.ManageMessages)
            if (permission) {
                message.delete(message.id).catch(err => { functions.createLog(err, true, false) });
            } else {
                const noPerms = await functions.getLanguageMessage(null, functions, connection, 3, language)
                message.channel.send({ content: noPerms })
            }
        }
    }
}
