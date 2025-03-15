require("dotenv").config();
const fs = require('fs');
const path = require('path');
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    cyan: "\x1b[36m",
};

module.exports.createLog = async (message, error, developerMode) => {
    this.registerLog(message, error, developerMode);
    if (error) {
        console.log(`${colors.red}(ERROR) [${new Date().toLocaleString()}] ${message}${colors.reset}`);
        return;
    }
    if (developerMode) {
        if (process.env.DEVELOPER_MODE) {
            console.log(`${colors.cyan}(DEV) [${new Date().toLocaleString()}] ${message}${colors.reset}`);
        }
        return;
    }
    console.log(`[${new Date().toLocaleString()}] ${message}`);
    return;
};

module.exports.registerLog = async (message, error, developerMode) => {
    const logFolder = path.join(process.cwd(), './logs');
    const currentDate = new Date().toISOString().split('T')[0];
    const logFileName = `${currentDate}.log`;
    const logFilePath = path.join(logFolder, logFileName);

    const logMessage = `[${new Date().toLocaleString()}] ${message}\n`;

    if (error) {
        fs.appendFileSync(logFilePath, `(ERROR) ${logMessage}`);
        return;
    }

    if (developerMode) {
        if (process.env.DEVELOPER_MODE) {
            fs.appendFileSync(logFilePath, `(DEV) ${logMessage}`);
        }
        return;
    }

    fs.appendFileSync(logFilePath, logMessage);
};
