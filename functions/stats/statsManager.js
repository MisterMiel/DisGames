const schedule = require('node-schedule');

module.exports.createNewStat = async (functions, connection, gameID, value) => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);

    const gameDetails = await functions.games;
    const game = gameDetails[gameID - 1];
    const points = game.pointPerGame;
    if (gameID > 0) { value = points; }
    const data = await functions.runQuery(functions, connection, `SELECT * FROM statistics WHERE gameID = "${gameID}" AND date = "${formattedDate}"`, false);
    if (data.length === 0) {
        const insert = await functions.runQuery(functions, connection, `INSERT INTO statistics (gameID, date, value) VALUES ("${gameID}", "${formattedDate}", "${value}")`, false);
    } else {
        const update = await functions.runQuery(functions, connection, `UPDATE statistics SET value = value + ${value} WHERE gameID = "${gameID}" AND date = "${formattedDate}"`, false);
    }
}

module.exports.updateStats = async (client, functions, connection) => {
    const tableMap = {
        'servers': -5,
        'serverJoined': -4,
        'users': -3,
        'members': -2,
        'points': -1
    };

    const job = schedule.scheduleJob('58 23 * * *', async function () {
        functions.createLog("Updating stats", false, true)
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10);
        const data = await functions.runQuery(functions, connection, `SELECT 'users' as users, COUNT(*) as row_count FROM users UNION ALL SELECT 'points', SUM(points) FROM points`, false);
        data.push({ users: 'servers', row_count: await client.guilds.cache.size });
        data.push({ users: 'members', row_count: await functions.getTotalMembers(client) });
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const row = data[i];
                const gameID = tableMap[row.users] || 0;
                const insert = await functions.runQuery(functions, connection, `INSERT INTO statistics (gameID, date, value) VALUES ("${gameID}", "${formattedDate}", ${row.row_count})`, false);
            }
        }
    });
}

module.exports.getTotalMembers = async (client) => {
    const guilds = client.guilds.cache.map((guild) => guild);
    let members = 0;
    guilds.forEach(i => {
        members = members + i.memberCount;
    });
    return members;
}
