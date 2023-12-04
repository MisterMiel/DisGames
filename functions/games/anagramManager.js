module.exports.getAnagram = async (functions, connection, language) => {
    const result = await functions.runQuery(functions, connection, `SELECT * FROM game_data WHERE languageID = '${language}' AND gameID = '3' ORDER BY RAND() LIMIT 1`);
    return result[0];
}

module.exports.createAnagram = async (functions, connection, response) => {
    functions.createLog("Creating anagram", false, true);
    const charArray = response.split("");

    for (let i = charArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
    }

    const scrambledMessage = charArray.join("");
    console.log(scrambledMessage)
    return scrambledMessage;
}