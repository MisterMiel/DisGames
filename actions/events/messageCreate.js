module.exports.run = async (client, functions, connection, message) => {
    functions.createLog("Running Message Create event", false, false);
    const message2 = await functions.getLanguageMessage(client, functions, connection, 1, "ESP");
    console.log(message)
    message.reply(message2);
};

module.exports.help = {
    event: "messageCreate"
}