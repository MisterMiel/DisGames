const mysql = require('mysql');
require("dotenv").config();

module.exports.createConnection = async (functions) => {
    functions.createLog("Trying to connect to database", false, true);
    return new Promise((resolve, reject) => {

        var connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
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
