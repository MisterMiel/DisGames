const { Client, Intents, Collection, ActivityType, MessageButton, MessageActionRow, Permissions } = require('discord.js');


const client = new Client({ intents: 34305 });
const config = require('./config.json');

client.commands = new Collection();
client.buttons = new Collection();
client.embeds = new Collection();

const functions = require('./handlers/functionManager.js');
const { getEvents } = require('./handlers/eventHandler.js');
const { getCommands } = require('./handlers/commandHandler.js');
const { createSlashCommands } = require('./handlers/slashCommandHandler.js');
const { getButtons } = require('./handlers/buttonHandler.js');
let connection = null;

client.on('ready', async () => {
    functions.createLog(`Logged in as ${client.user.tag}`, false, false);
    //TODO: Change status to old one
    client.user.setActivity('v0.3', { type: ActivityType.Watching });

    connection = await functions.createConnection(functions);


    const commands = await getCommands(client, functions);

    const buttons = await getButtons(client, functions);

    const events = await getEvents(client, functions, connection);
    
    const languages = await functions.getLanguages(client, functions, connection);

    const games = await functions.getAllGameRules(client, functions, connection);
    
    const slashCommands = await createSlashCommands(client, functions);

    const servers = await functions.getAllServers(client, functions, connection);

    const users = await functions.getAllUsers(functions, connection);
    //const myServer = await functions.getServer(client, functions, connection, '1061703062294626334');

    const stats = await functions.updateStats(client, functions, connection);
});



client.login(config['Keys']['Token']);
