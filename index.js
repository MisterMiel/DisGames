const { Client, Intents, Collection, MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');


const client = new Client({ intents: 3243773 });
const config = require('./config.json');
client.events = new Collection();



const functions = require('./handlers/functionManager.js');
const { getEvents } = require('./handlers/eventHandler.js');

let connection = null;

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    await functions.createLog("Teer", false, false)

    connection = await functions.createConnection();

    const events = await getEvents(client);

    
    //Get all languages
    //Create commands
    //Create events

});

client.on('raw', (raw) => {
    const event = client.events.get(raw.t);
    if (!event) return;
    event.run(client, functions, connection, raw);
});



client.login(config['Keys']['Token']);
