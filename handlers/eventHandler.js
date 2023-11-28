const fs = require('fs');
const path = require('path');

async function getEvents(client, functions, connection) {
    const eventsFolderPath = path.join(__dirname, '../actions/events');

    fs.readdir(eventsFolderPath, (err, files) => {
        if (err) throw err;

        const jsFiles = files.filter(f => f.split(".").pop() === "js");

        if (jsFiles.length <= 0) return console.log(`(ERROR) No events Found!`);

        jsFiles.forEach(file => {
            const event = require(path.join(eventsFolderPath, file));
            if(event.data === undefined) return;
            try {
                client[event.data.type](event.data.name, event.run(client, functions, connection));
            } catch (err) {
                console.log(err);
            }
        });
    });
}

module.exports = { getEvents };
