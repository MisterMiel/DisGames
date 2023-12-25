const mysql = require('mysql');
const config = require('../../config.json');

module.exports.createConnection = async (functions) => {
    functions.createLog("Trying to connect to database", false, true);
    return new Promise((resolve, reject) => {

        var connection = mysql.createConnection({
            host: config["Keys"]["Database"]["Host"],
            user: config["Keys"]["Database"]["User"],
            password: config["Keys"]["Database"]["Password"],
            database: config["Keys"]["Database"]["Database"]
        })

        connection.connect(err => {
            if (err) throw err;
        })
        functions.createLog("Connected to database", false, false);
        resolve(connection);
    })

};

module.exports.runQuery = async (functions, connection, query, consoleLog) => {
    if (consoleLog === undefined || consoleLog === true) { functions.createLog("Trying to run a query", false, true); }
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) throw err;
            if (consoleLog === undefined || consoleLog === true) {
                functions.createLog("Query runned", false, true);
                if (consoleLog) {
                    functions.createLog("Query Output", true, false)
                    console.log(result)
                };
            }

            resolve(result);
        })
    })

};
