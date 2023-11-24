const { Client, Intents, Collection, MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');


const client = new Client({ intents: 33280 });
const config = require('./config.json');
client.events = new Collection();



const functions = require('./handlers/functionManager.js');
const { getEvents } = require('./handlers/eventHandler.js');

let connection = null;

client.on('ready', async () => {
    functions.createLog(`Logged in as ${client.user.tag}`, false, false);

    await functions.createLog("Teer", false, false)

    connection = await functions.createConnection(functions);

    const events = await getEvents(client);


    const languages = await functions.getLanguages(client, functions, connection);

    const message = await functions.getLanguageMessage(client, functions, connection, 1, "ESP");
    console.log(message);
    //Get all languages
    //Create commands
    //Create events

});

client.on('raw', (raw) => {
    const event = client.events.get(raw.t);
    if (!event) return;
    event.run(client, functions, connection, raw);
});

client.on('messageCreate', (message) => {
    console.log(message);
});




client.login(config['Keys']['Token']);
