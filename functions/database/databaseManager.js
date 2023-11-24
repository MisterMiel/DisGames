const mysql = require('mysql');
const config = require('../../config.json');

module.exports.createConnection = async () => {
    console.log("Trying to connect to database");
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
        console.log("Connected to database");
        resolve(connection);
    })

};

module.exports.runQuery = async (connection, query) => {
    console.log("Trying to run a query");
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("Query runned")
            resolve(result);
        })
    })

};
