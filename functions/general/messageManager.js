const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports.createEmbed = async (functions, title, description, image) => {
    functions.createLog("Creating embed", false, true)
    let embed = new EmbedBuilder()
        .setDescription(description)
        .setColor("#03fca9");

    if (!title) embed.setTitle("No title was provided")
    else embed.setTitle(title);
    if (image) embed.setImage(image);
    return embed;
}

module.exports.createButton = async (functions, label, style, customID, link) => {
    const actionRow = new addons.ActionRowBuilder().addComponents(
        new addons.ButtonBuilder()
            .setLabel("◀")
            .setCustomId("PreviousPage")
            .setStyle(1),
        new addons.ButtonBuilder()
            .setLabel("▶")
            .setCustomId("NextPage")
            .setStyle(1),
        new addons.ButtonBuilder()
            .setLabel("🏡")
            .setCustomId("HomePage")
            .setStyle(2)
    );
}

module.exports.reactMessage = async (functions, message, reaction) => {
    functions.createLog("Reacting to message", false, true);
    const perms = functions.checkPermission(functions, message, PermissionsBitField.Flags.AddReactions);
    if (perms === false) return;
    message.react(reaction).catch(err => { functions.createLog(err, true, false) });
    return;
};
