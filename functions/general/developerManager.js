const config = require('../../config.json');

module.exports.createLog = async (message, error, developerMode) => {
    console.log(`[${new Date().toLocaleString()}] ${message}`);

};
