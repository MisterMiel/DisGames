const config = require('../../config.json');
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    cyan: "\x1b[36m",
};

module.exports.createLog = async (message, error, developerMode) => {

    if (error) {
        console.log(`${colors.red}(ERROR) [${new Date().toLocaleString()}] ${message}${colors.reset}`);
        return;
    }
    if (developerMode) {
        if (config["DeveloperMode"]) {
            console.log(`${colors.cyan}(DEV) [${new Date().toLocaleString()}] ${message}${colors.reset}`);
        }
        return;
    }
    console.log(`[${new Date().toLocaleString()}] ${message}`);
    return;

};
