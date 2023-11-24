const fs = require('fs');

async function getEvents(client) {
    fs.readdir(`./actions/events/`, (err, files) => {
        if (err) throw err;
        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) return console.log(`(ERROR) No events Found!`);

        jsFiles.forEach(file => {
            var fileGet = require(`${process.cwd()}/actions/events/${file}`);
            try {
                client.events.set(fileGet.help.event, fileGet);
                //console.log(`(SUCCESS) Loaded Event: ${fileGet.help.event}`);
            } catch (err) {
                return console.log(err);
            }
        });
    });
};

module.exports = { getEvents }