const config = require('../../config.json');
let languages = [];

module.exports.getLanguages = async (client, functions, connection) => {
    functions.createLog("Fetching all messages", false, true);
    const data = await functions.runQuery(functions, connection, 'SELECT * FROM language');
    languages = data;
    return true;
};

module.exports.getLanguageMessage = async (client, functions, connection, id, language) => {
    if (languages.length === 0) {
        await this.getLanguages(client, functions, connection);
    } 
    
    for(let i = 0; i < languages.length; i++) {
       if(languages[i].ID === id) {
            return languages[i][language];
       }
    }

    return 'No message set for this language.';
}
