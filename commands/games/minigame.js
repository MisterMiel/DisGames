module.exports = {
    data: {
        name: 'spel',
        message: true,
        options: [],
        description: "A minigame",
        permissions: [],
    },
    run: function (client, functions, connection, message) {
        //return async function (message) {
            message.reply("This is a minigame");
        //}
    }
}