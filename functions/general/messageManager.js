const { EmbedBuilder } = require('discord.js');

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