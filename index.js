const { Client, Intents, Collection, MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');


const client = new Client({ intents: 34305 });
const config = require('./config.json');

client.commands = new Collection();

const functions = require('./handlers/functionManager.js');
const { getEvents } = require('./handlers/eventHandler.js');
const { getCommands } = require('./handlers/commandHandler.js');
const { createSlashCommands } = require('./handlers/slashCommandHandler.js');
let connection = null;

client.on('ready', async () => {
    functions.createLog(`Logged in as ${client.user.tag}`, false, false);

    await functions.createLog("Teer", false, false)

    connection = await functions.createConnection(functions);

    const commands = await getCommands(client, functions);

    const events = await getEvents(client, functions, connection);
    
    const languages = await functions.getLanguages(client, functions, connection);

    const message = await functions.getLanguageMessage(client, functions, connection, 1, "ESP");
    console.log(message);


    const slashCommands = await createSlashCommands(client, functions);


});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const event = client.events.get('messageCreate');
    if (!event) return;
    event.run(client, functions, connection, message);
});


client.login(config['Keys']['Token']);
