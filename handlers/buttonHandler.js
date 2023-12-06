const fs = require('fs');

async function getButtons(client, functions) {

        fs.readdir(`./actions/buttons/`, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                const button = require(`../actions/buttons/${file}`);
                if(button.data === undefined) return
                client.buttons.set(button.data.name, button);
                functions.createLog(`${button.data.name} loaded`, false, true)
            });
        });

    
}

module.exports = { getButtons };
