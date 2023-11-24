module.exports.run = async (client, functions, connection, raw) => {
    functions.createLog("Running Message Create event", false, false);
    const message = await functions.getLanguageMessage(client, functions, connection, 1, "ESP");
    console.log(raw)
    //raw.d.message.reply(message);
};

module.exports.help = {
    event: "MESSAGE_CREATE"
}