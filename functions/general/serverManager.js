const config = require('../../config.json');
let servers = [];

module.exports.getAllServers = async (client, functions, connection) => {
    functions.createLog("Fetching all servers", false, true);
    const data = await functions.runQuery(functions, connection, 'SELECT * FROM servers');
    for (let i = 0; i < data.length; i++) {
        servers.push(data[i]);
    }
    return true;
};

module.exports.getServer = async (client, functions, connection, id) => {
    if (servers.length === 0) {
        await this.getAllServers(client, functions, connection);
    }

    for (let i = 0; i < servers.length; i++) {
        if (servers[i].ID === id) {
            return servers[i];
        }
    }

    return 'No servers found.';
}

module.exports.createServer = async (client, functions, connection, id) => {

    const data = await functions.runQuery(functions, connection, `SELECT * FROM servers WHERE ID = '${id}'`);
    if (data.length > 0) {
        return false;
    }

    functions.createLog("Creating new server", false, true);
    const insert = await functions.runQuery(functions, connection, "INSERT INTO servers (ID) VALUES ('" + id + "')", false);
    const server = {
        ID: id,
        Language: 1,
        points: 0
    }
    servers.push(server);
    return true;
}

module.exports.servers = servers;