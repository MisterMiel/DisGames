const mysql = require('mysql2'); 
require("dotenv").config();

module.exports.createConnection = async (functions) => {
    functions.createLog("Trying to connect to database", false, true);
    
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            authPlugins: {
                mysql_clear_password: () => () => Buffer.from(process.env.DB_PASSWORD)
            }
        });

        connection.connect(err => {
            if (err) {
                functions.createLog("Database connection failed: " + err.message, true, true);
                return reject(err);
            }

            functions.createLog("Connected to database", false, false);
            resolve(connection);
        });
    });
};

module.exports.runQuery = async (functions, connection, query, consoleLog = false) => {
    if (consoleLog) { functions.createLog("Trying to run a query", false, true); }

    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                functions.createLog("Query failed: " + err.message, true, true);
                return reject(err);
            }

            if (consoleLog) {
                functions.createLog("Query executed successfully", false, true);
                functions.createLog("Query Output", true, false);
                console.log(result);
            }

            resolve(result);
        });
    });
};