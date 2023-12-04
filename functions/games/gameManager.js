
module.exports.getGameRules = async (client, functions, connection, gameID) => {
    return 'No message set for this language.';
}

module.exports.getSuccessor = async (client, functions, connection, gameID) => {
    if (gameID === 1) {



        return;
    }
    return 'No message set for this language.';
}

module.exports.runGame = async (functions, connection, type, message, result) => {
    const language = await functions.getServerLanguage(functions, connection, message.guild.id)
    const data = await functions.runQuery(functions, connection, `SELECT * FROM game_data LEFT JOIN game_types ON game_data.gameID = game_types.ID WHERE languageID = '${language}' AND gameID = '${type}' ORDER BY RAND() LIMIT 1`);
    const game = data[0];

    if (type === 1 && result !== undefined) { game.response = parseInt(result.response) + 1; }
    if (type === 2 && result !== undefined) { game.response = message.content.charAt(message.content.length-1).toLowerCase(); }
    if (type === 3) {
        const anagram = await functions.createAnagram(functions, connection, game.response);
        game.message = anagram;
    }

    console.log(game)

    const embed = await functions.createEmbed(functions, game.gameName, game.message, game.picture);
    if (result === undefined) {
        message.reply({ embeds: [embed] }, { ephemeral: true })
        if (game.replyMessage == 1) message.channel.send({ embeds: [embed] })
        const insertedGame = await functions.runQuery(functions, connection, "INSERT INTO `games` (`channelID`, `serverID`, `type`, `response`) VALUES ('" + message.channel.id + "', '" + message.guild.id + "', '" + type + "', '" + game.response + "')");
    } else if (result.response.toLowerCase() === message.content.toLowerCase() || (type === 2 && result.response.toLowerCase() === message.content.charAt(0).toLowerCase())) {
        functions.reactMessage(functions, message, "✅");
        if (game.replyMessage == 1) message.channel.send({ embeds: [embed] })
        functions.runQuery(functions, connection, "UPDATE `games` SET `response` = '" + game.response + "' WHERE `channelID` = '" + message.channel.id + "'");
    }
}
