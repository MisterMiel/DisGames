const { REST, Routes } = require('discord.js');
const config = require('../config.json');


async function createSlashCommands(client, functions) {
    const slashCommands = [];


    client.commands.forEach(commands => {
        if (commands.data.name === "disabled") return;
        let commandObject = {
            name: commands.data.name,
            description: commands.data.description || "No description provided",
            default_member_permissions: commands.data.permissions || 0,
            options: commands.data.options
        };
        slashCommands.push(commandObject);
        functions.createLog(`slashCommand ${commands.data.name}`, false, true)
    });

    functions.createLog(`Creating slashCommands`, false, false)

    const rest = new REST().setToken(config["Keys"]["Token"]);

    (async () => {
        try {
            functions.createLog(`Started refreshing ${slashCommands.length} application (/) commands.`, false, true);

            const data = await rest.put(
                Routes.applicationGuildCommands(config["Keys"]["ClientID"], '1061703062294626334'),
                { body: slashCommands },
            );

            const secondData = await rest.put(
                Routes.applicationGuildCommands(config["Keys"]["ClientID"], '797846882818457600'),
                { body: slashCommands },
            )

            functions.createLog(`Successfully reloaded ${slashCommands.length} application (/) commands.`, false, true);
        } catch (error) {
            functions.createLog(error, true, false);
        }
    })();
};


module.exports = { createSlashCommands };