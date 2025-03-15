let users = [];

module.exports.getAllUsers = async (functions, connection) => {
    functions.createLog("Fetching all users", false, true);
    const data = await functions.runQuery(functions, connection, 'SELECT * FROM users');
    for (let i = 0; i < data.length; i++) {
        users.push(data[i]);
    }
    return true;
};

module.exports.getUser = async (functions, connection, id) => {
    if (users.length === 0) {
        await this.getAllUsers(functions, connection);
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].ID === id) {
            return users[i];
        }
    }

    return 'No users found.';
}

module.exports.createUser = async (functions, connection, id) => {
    const data = await functions.runQuery(functions, connection, `SELECT * FROM users WHERE userID = '${id}'`);
    if (data.length > 0) {
        return false;
    }

    functions.createLog("Creating new user", false, true);
    const insert = await functions.runQuery(functions, connection, "INSERT INTO users (userID) VALUES ('" + id + "')", false);
    const User = {
        ID: id,
    }
    users.push(User);
    return true;
}

module.exports.users = users;