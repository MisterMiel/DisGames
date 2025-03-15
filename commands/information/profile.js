const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: {
        name: 'profile',
        message: false,
        options: [],
        description: "Show a profile",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {

        const games = functions.games;
        //TODO: Add badges section to profile
        const transformedOptions = games
            .filter(rowData => rowData.gameDisabled !== 1)
            .map(async (rowData) => {
                const emojiMap = {
                    'Count': '🔢',
                    'Snake': '🐍',
                    'Anagram': '📋',
                    'Arrow Guesser': '🔼',
                    'Trivia': '👥',
                    'Price Guesser': '💍',
                    'Math Challenge': '📊',
                    'Guess the Flag': '🚩',
                };

                const emoji = emojiMap[rowData.gameName] || '❓';
                const description = await functions.getLanguageMessage(client, functions, connection, rowData.description, 'EN') || 'No description provided';
                return new StringSelectMenuOptionBuilder()
                    .setLabel(`${emoji} ${rowData.gameName}`)
                    .setDescription(description)
                    .setValue(rowData.ID.toString());
            });
        const options = await Promise.all(transformedOptions);
        const dropdown = new StringSelectMenuBuilder()
            .setCustomId('profileInfoSelector')
            .setPlaceholder('Select a game!')
            .addOptions(options);
        const row = new ActionRowBuilder()
            .addComponents(dropdown);
        const gamePoints = await functions.runQuery(functions, connection, `SELECT userID, SUM(points) AS total_points FROM points WHERE userID = '${message.user.id}' GROUP BY userID`);
        const embed = await functions.createEmbed(functions, `${message.user.globalName}'s profile`, "**INFORMATION**```" + `User: ${message.user.globalName}\nPoints: ${gamePoints[0].total_points}` + "```", null);

        const permission = await functions.checkPermission(functions, message, PermissionsBitField.Flags.SendMessages)
        if (permission) {
            //TODO: send command user a message with the error
            const sent = await message.reply({ embeds: [embed], components: [row], fetchReply: true });
            await client.embeds.set(sent.id, message.user.id);
            setTimeout(async () => {
                functions.createLog("Deleting profile message", false, true)
                await client.embeds.delete(sent.id);
                const newRow = new ActionRowBuilder()
                    .addComponents(dropdown.setDisabled(true));
                await sent.edit({ components: [newRow] });
            }, 60000);
        } else {
            const noPerms = await functions.getLanguageMessage(null, functions, connection, 3, language)
            console.log(noPerms)
        }

    }
}