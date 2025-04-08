const schedule = require('node-schedule');
const axios = require('axios');
require('dotenv').config();

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

module.exports.createNewStat = async (functions, connection, gameID, value) => {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    const gameDetails = await functions.games;
    const game = gameDetails[gameID - 1];
    if (gameID > 0) { 
        const points = game.pointPerGame;
        value = points; 
    }
    const query = `
        INSERT INTO statistics (gameID, date, value)
        VALUES ("${gameID}", "${formattedDate}", "${value}")
        ON DUPLICATE KEY UPDATE value = value + ${value}`;
    await functions.runQuery(functions, connection, query, false);
};

module.exports.updateStats = async (client, functions, connection) => {
    const tableMap = {
        'servers': -5,
        'serverJoined': -4,
        'users': -3,
        'members': -2,
        'points': -1
    };

    const job = schedule.scheduleJob('58 23 * * *', async function () {
        functions.createLog("Updating stats", false, true);
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 10);
        const previousDate = new Date(date);
        previousDate.setDate(previousDate.getDate() - 1);
        const formattedPreviousDate = previousDate.toISOString().slice(0, 10);

        const data = await functions.runQuery(functions, connection, `
            SELECT 'users' as users, COUNT(*) as row_count FROM users
            UNION ALL
            SELECT 'points', SUM(points) FROM points`, false);
        data.push({ users: 'servers', row_count: await client.guilds.cache.size });
        data.push({ users: 'members', row_count: await functions.getTotalMembers(client) });

        if (data.length > 0) {
            let statsMessage = "Daily Stats:\n";
            for (let i = 0; i < data.length; i++) {
                const row = data[i];
                const gameID = tableMap[row.users] || 0;

                // Fetch the previous day's value
                const previousData = await functions.runQuery(functions, connection, `
                    SELECT value FROM statistics
                    WHERE gameID = "${gameID}" AND date = "${formattedPreviousDate}"`, false);
                const previousValue = previousData.length > 0 ? previousData[0].value : 0;

                // Calculate the difference
                const difference = row.row_count - previousValue;

                statsMessage += `${row.users}: ${row.row_count} (${difference >= 0 ? '+' : ''}${difference})\n`;

                const query = `
                    INSERT INTO statistics (gameID, date, value)
                    VALUES ("${gameID}", "${formattedDate}", ${row.row_count})
                    ON DUPLICATE KEY UPDATE value = ${row.row_count}`;
                await functions.runQuery(functions, connection, query, false);
            }

            // Send stats to Discord webhook
            if (discordWebhookUrl) {
                try {
                    await axios.post(discordWebhookUrl, {
                        content: `**Daily Stats Report**\n\`\`\`${statsMessage}\`\`\``,
                    });
                    console.log('Stats sent to Discord webhook');
                } catch (webhookErr) {
                    console.error('Failed to send stats to Discord webhook:', webhookErr.message);
                }
            } else {
                console.error('Discord webhook URL not found in environment variables');
            }
        }
    });
};

module.exports.getTotalMembers = async (client) => {
    const guilds = client.guilds.cache.map((guild) => guild);
    let members = 0;
    guilds.forEach(i => {
        members += i.memberCount;
    });
    return members;
};
