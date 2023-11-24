module.exports.run = async (client, functions, connection, raw) => {
    functions.createLog("test", false, false);
    const data = await functions.runQuery(connection, 'SELECT * FROM users')
    console.log(data)
};

module.exports.help = {
    event: "MESSAGE_CREATE"
}