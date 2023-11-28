
module.exports.getGameRules = async (client, functions, connection, gameID) => {
    return 'No message set for this language.';
}

module.exports.getSuccessor = async (client, functions, connection, gameID) => {
    if(gameID === 1) {



        return;
    }
    return 'No message set for this language.';
}

//1 = Count
module.exports.runGame1 = async (functions, connection, message, result) => {
    if(parseInt(result.response) == parseInt(message.content)) {
        message.reply('Correct!');
        functions.runQuery(functions, connection, "UPDATE `games` SET `response` = `response` + 1 WHERE `channelID` = '"+message.channel.id+"'");
        return;
    }

}

//2 = Snake
module.exports.runGame2 = async (client, functions, connection) => {
    console.log('This is a test2')
}

//3 = Anagram
module.exports.runGame3 = async (client, functions, connection) => {
    console.log('This is a test3')
}

//4 = Arrow Guesser
module.exports.runGame4 = async (client, functions, connection) => {
    console.log('This is a test4')
}

//5 = Age Guesser
module.exports.runGame5 = async (client, functions, connection) => {
    console.log('This is a test5')
}

//6 = Price Guesser
module.exports.runGame6 = async (client, functions, connection) => {
    console.log('This is a test6')
}

//7 = Math Challenge
module.exports.runGame7 = async (client, functions, connection) => {
    console.log('This is a test7')
}

//8 = Guess the Flag
module.exports.runGame8 = async (client, functions, connection) => {
    console.log('This is a test8')
}