const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');


module.exports.createEmbed = async (functions, title, description, image) => {
    functions.createLog("Creating embed", false, true)
    let embed = new EmbedBuilder()
        .setDescription(description)
        .setColor("#03fca9");

    if(!title) embed.setTitle("No title was provided")
    else embed.setTitle(title);
    if (image) embed.setImage(image);
    return embed;
}

module.exports.reactMessage = async (functions, message, reaction) => {
    functions.createLog("Reacting to message", false, true);
    const perms = functions.checkPermission(functions, message, PermissionsBitField.Flags.AddReactions);
    if(perms === false) return;
    message.react(reaction).catch(err => { functions.createLog(err, true, false) });
    return;
};
