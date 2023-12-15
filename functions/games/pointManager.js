module.exports.setGamePoints = async (functions, connection, gameID, userID, serverID) => {
    functions.createLog("Updating game points", false, true);
    const gameDetails = await functions.games;
    const game = gameDetails[gameID - 1];
    const points = game.pointPerGame;
    const getUser = await functions.runQuery(functions, connection, `SELECT * FROM points WHERE userID = '${userID}' AND serverID = '${serverID}' AND gameID = '${gameID}'`);
    if (getUser.length === 0) {
        await functions.runQuery(functions, connection, `INSERT INTO points (userID, serverID, gameID, points) VALUES (${userID}, ${serverID}, ${gameID}, ${points})`);
    } else {
        await functions.runQuery(functions, connection, `UPDATE points SET points = points + ${points} WHERE userID = ${userID} AND serverID = ${serverID} AND gameID = ${gameID}`);
    }

    return true;
}