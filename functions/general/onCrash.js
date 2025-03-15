const fs = require('fs');
const path = require('path');

const logsFolder = path.join(process.cwd(), './logs');

process.on('uncaughtException', (err) => {
    let currentTime = new Date();
    let logsName = `ERROR__${currentTime.getDate()}-${currentTime.getMonth() + 1}-${currentTime.getFullYear()}__${currentTime.getHours()}_${currentTime.getMinutes()}_${currentTime.getSeconds()}.txt`;
    console.log("🚀 ~ process.on ~ logsFolder:", logsFolder)

    if (!fs.existsSync(logsFolder)) {
       return console.error('Logs folder not found');
    }
    fs.writeFileSync(path.join(logsFolder, logsName), `${err.name}\n\n${err.stack}`);

    console.log(`Error logged in ${logsName}`);
});