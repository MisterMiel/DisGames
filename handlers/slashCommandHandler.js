async function createSlashCommands(client, functions) {
    var data = [];
    client.commands.forEach(commands => {
        if(commands.data.name === "disabled") return;
        let commandObject = {
            name: commands.data.name,
            description: commands.data.description || "No description provided",
            default_member_permissions: commands.data.permissions || [],
            options: commands.data.options
        };
        data.push(commandObject);
        functions.createLog(`slashCommand ${commands.data.name}`, false, true)
    });

    functions.createLog(`Creating slashCommands`, false, false)

    //await client.application?.commands.set(data)
    await client.guilds.cache.get('1061703062294626334')?.commands.set([]);
    await client.guilds.cache.get('1061703062294626334')?.commands.set(data);

};


module.exports = { createSlashCommands };