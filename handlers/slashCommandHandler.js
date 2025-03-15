const { REST, Routes } = require('discord.js');
require("dotenv").config();


async function createSlashCommands(client, functions) {
    const slashCommands = [];


    client.commands.forEach(commands => {
        if (commands.data.name === "disabled") return;
        let commandObject = {
            name: commands.data.name,
            description: commands.data.description || "No description provided",
            default_member_permissions: 0,
            options: commands.data.options
        };
        slashCommands.push(commandObject);
        functions.createLog(`slashCommand ${commands.data.name}`, false, true)
    });

    functions.createLog(`Creating slashCommands`, false, false)

    const rest = new REST().setToken(process.env.TOKEN);

    (async () => {
        try {
            functions.createLog(`Started refreshing ${slashCommands.length} application (/) commands.`, false, true);

            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: slashCommands },
            );

            functions.createLog(`Successfully reloaded ${slashCommands.length} application (/) commands.`, false, true);
        } catch (error) {
            functions.createLog(error, true, false);
        }
    })();
};


module.exports = { createSlashCommands };