module.exports.run = async (client, functions, connection, raw) => {
    functions.createLog("test", false, false);
};

module.exports.help = {
    event: "MESSAGE_CREATE"
}