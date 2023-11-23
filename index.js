const { Client, Intents, Collection, MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');


const client = new Client({ intents: 32767 });
const config = require('./config.json');
client.functions = new Collection();



const functions = require('./handlers/functionManager.js');



client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    await functions.createLog("Teer", false, false)

    const connection = await functions.createConnection();
    //Connect to Database
    //Get all languages
    //Create commands
    //Create events

});

client.on('message', (message) => {
    if (message.content === 'ping') {
        message.reply('Pong!');
    }
});

client.login(config['Keys']['Token']);
