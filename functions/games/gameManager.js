
module.exports.getGameRules = async (client, functions, connection, gameID) => {
    return 'No message set for this language.';
}

module.exports.getSuccessor = async (client, functions, connection, gameID) => {
    if (gameID === 1) {



        return;
    }
    return 'No message set for this language.';
}

//1 = Count
module.exports.runGame1 = async (functions, connection, message, result) => {
    if (result == undefined) {
        message.reply('Correct!');
        const game = await functions.runQuery(functions, connection, "INSERT INTO `games` (`channelID`, `type`, `response`) VALUES ('" + message.channel.id + "', '" + 1 + "', '" + 1 + "')");
        return
    }
    if (parseInt(result.response) == parseInt(message.content)) {
        functions.reactMessage(functions, message, "✅");
        functions.runQuery(functions, connection, "UPDATE `games` SET `response` = `response` + 1 WHERE `channelID` = '" + message.channel.id + "'");
        return;
    }

}

//2 = Snake
module.exports.runGame2 = async (functions, connection) => {
    console.log('This is a test2')
}

//3 = Anagram
module.exports.runGame3 = async (functions, connection, message, result) => {
    const anagramWord = await functions.getAnagram(functions, connection, 'EN');
    const anagram = await functions.createAnagram(functions, connection, anagramWord.response);
    if (result == undefined) {
        const embed = await functions.createEmbed(functions, 'Anagram:', anagram, anagramWord.picture);
        message.reply({ embeds: [embed], ephemeral: true })
        message.channel.send({embeds: [embed]})
        const game = await functions.runQuery(functions, connection, "INSERT INTO `games` (`channelID`, `type`, `response`) VALUES ('" + message.channel.id + "', '" + 3 + "', '" + anagramWord.response + "')");
        return
    }
    if (result.response.toLowerCase() === message.content.toLowerCase()) {
        functions.reactMessage(functions, message, "✅");
        const embed = await functions.createEmbed(functions, 'Anagram:', anagram, anagramWord.picture);
        message.reply({ embeds: [embed] })
        functions.runQuery(functions, connection, "UPDATE `games` SET `response` = '" + anagramWord.response + "' WHERE `channelID` = '" + message.channel.id + "'");
        return;
    }
}

//4 = Arrow Guesser
module.exports.runGame4 = async (functions, connection) => {
    console.log('This is a test4')
}

//5 = Age Guesser
module.exports.runGame5 = async (functions, connection) => {
    console.log('This is a test5')
}

//6 = Price Guesser
module.exports.runGame6 = async (functions, connection) => {
    console.log('This is a test6')
}

//7 = Math Challenge
module.exports.runGame7 = async (functions, connection) => {
    console.log('This is a test7')
}

//8 = Guess the Flag
module.exports.runGame8 = async (functions, connection) => {
    console.log('This is a test8')
}