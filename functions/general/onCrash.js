const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config(); 

const logsFolder = path.join(process.cwd(), './logs');
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

process.on('uncaughtException', async (err) => {
    let currentTime = new Date();
    let logsName = `ERROR__${currentTime.getDate()}-${currentTime.getMonth() + 1}-${currentTime.getFullYear()}__${currentTime.getHours()}_${currentTime.getMinutes()}_${currentTime.getSeconds()}.txt`;

    if (!fs.existsSync(logsFolder)) {
        return console.error('Logs folder not found');
    }

    const errorDetails = `${err.name}\n\n${err.stack}`;
    fs.writeFileSync(path.join(logsFolder, logsName), errorDetails);

    console.log(`Error logged in ${logsName}`);

    if (discordWebhookUrl) {
        try {
            await axios.post(discordWebhookUrl, {
                content: `An error occurred:\n\`\`\`${errorDetails}\`\`\``,
            });
            console.log('Error reported to Discord webhook');
        } catch (webhookErr) {
            console.error('Failed to send error to Discord webhook:', webhookErr.message);
        }
    } else {
        console.error('Discord webhook URL not found in environment variables');
    }
});