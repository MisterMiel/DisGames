const fs = require('fs');
const path = require('path');

let logsFolder = `../../logs`; // Zet hier de folder waar de log bestanden in moeten komen

process.on('uncaughtException', (err) => {
    let currentTime = new Date();
    let logsName = `ERROR__${currentTime.getDate()}-${currentTime.getMonth() + 1}-${currentTime.getFullYear()}__${currentTime.getHours()}_${currentTime.getMinutes()}_${currentTime.getSeconds()}.txt`;

    fs.writeFileSync(path.join(__dirname, logsFolder, logsName), `${err.name}\n\n${err.stack}`);

    console.log(`Error logged in ${logsName}`);

    //process.exit(); 
});