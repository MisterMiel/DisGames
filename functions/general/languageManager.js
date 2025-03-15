let languages = [];

module.exports.getLanguages = async (client, functions, connection) => {
    functions.createLog("Fetching all messages", false, true);
    const data = await functions.runQuery(functions, connection, 'SELECT * FROM language');
    languages = data;
    return true;
};

module.exports.getLanguageMessage = async (client, functions, connection, id, language, placeholders = {}) => {
    if (languages.length === 0) {
        await this.getLanguages(client, functions, connection);
    } 
    
    for (let i = 0; i < languages.length; i++) {
       if (languages[i].ID === id) {
            let message = languages[i][language] || 'No message set for this language.';
            Object.entries(placeholders).forEach(([placeholder, value]) => {
                const regex = new RegExp(`\\[\\^${placeholder}\\]`, 'g');
                message = message.replace(regex, value);
            });

            return message;
       }
    }
    return 'No message set for this language.';
};

module.exports.convertLanguage = async (language, reverse = false) => {
    const languageMapping = {
        0: 'BAN',
        1: 'EN',
        2: 'NL',
        3: 'ES',
        4: 'DE'
    };

    const reverseMapping = Object.fromEntries(
        Object.entries(languageMapping).map(([key, value]) => [value, parseInt(key)])
    );

    if (reverse) {
        return reverseMapping[language] || 1; 
    } else {
        return languageMapping[language] || 'EN'; 
    }
};
