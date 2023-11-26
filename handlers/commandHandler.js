const fs = require('fs');

async function getCommands(client, functions) {

    fs.readdirSync('./commands/').forEach(dir => {
        fs.readdir(`./commands/${dir}/`, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                const command = require(`../commands/${dir}/${file}`);
                if(command.data === undefined) return
                client.commands.set(command.data.name, command);
                functions.createLog(`${command.data.name} loaded`, false, true)
            });
        });

    })
}

module.exports = { getCommands };
