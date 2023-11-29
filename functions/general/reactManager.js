const { PermissionsBitField } = require('discord.js');
const config = require('../../config.json');

module.exports.reactMessage = async (functions, message, reaction) => {
    functions.createLog("Reacting to message", false, true);
    const perms = functions.checkPermission(functions, message, PermissionsBitField.Flags.AddReactions);
    if(perms === false) return;
    message.react(reaction).catch(err => { functions.createLog(err, true, false) });
    return;
};
