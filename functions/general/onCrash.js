const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config(); 

const logsFolder = path.join(process.cwd(), './logs');
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
const COOLIFY_APP_UUID = process.env.COOLIFY_APP_UUID;
const MONITOR_URL = process.env.MONITOR_URL;

async function callCoolifyMonitor(action, errorMessage = null, errorCode = null) {
  try {
    if (!COOLIFY_APP_UUID || !MONITOR_URL) {
      console.log('Coolify Monitor not configured');
      return null;
    }
    
    const response = await axios.post(MONITOR_URL, {
      action,
      serverId: COOLIFY_APP_UUID,
      errorMessage,
      errorCode
    });
    
    return response.data;
  } catch (error) {
    console.error('Error calling Coolify Monitor:', error.message);
    return null;
  }
}

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
    
    await callCoolifyMonitor('REPORT_ERROR', err.message, err.name);
});