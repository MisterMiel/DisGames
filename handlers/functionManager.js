const fs = require('fs');

function functions() { }

fs.readdirSync('./functions/').forEach(dir => {
    fs.readdir(`./functions/${dir}/`, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            const func = require(`../functions/${dir}/${file}`);
            console.log()
            Object.assign(functions.prototype, func);
        });
    });

})

module.exports = new functions();
