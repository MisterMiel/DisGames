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

    const data = await functions.runQuery(functions, connection, `SELECT * FROM servers WHERE ID = '${id}'`, false);
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

module.exports.getServerLanguage = async (functions, connection, id) => {
    for (let i = 0; i < servers.length; i++) {
        if (servers[i].ID === id) {
            const language = await functions.convertLanguage(servers[i].Language);
            return language;
        }
    }

    const data = await functions.runQuery(functions, connection, `SELECT * FROM servers WHERE ID = '${id}'`);
    if (data.length > 0) {
        const language = await functions.convertLanguage(data[0].Language);
        return language;
    } else {
        functions.createServer(null, functions, connection, id)
        return 'EN';
    }

}



module.exports.updateServerLanguage = async (functions, connection, id, language) => {
    const convertedLanguage = await functions.convertLanguage(language, true);
    for (let i = 0; i < servers.length; i++) {
        if (servers[i].ID === id) {
            servers[i].Language = convertedLanguage
        }
    }
    const update = await functions.runQuery(functions, connection, "UPDATE servers SET Language = '" + convertedLanguage + "' WHERE ID = '" + id + "'");
}


module.exports.servers = servers;