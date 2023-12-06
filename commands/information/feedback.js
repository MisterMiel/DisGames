module.exports = {
    data: {
        name: 'feedback',
        message: false,
        options: [
            {
                name: "message",
                description: "Your message",
                type: 3,
                required: true
            }
        ],
        description: "A minigame",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {
        const language = await functions.getServerLanguage(functions, connection, message.guild.id);
        const response = await functions.getLanguageMessage(client, functions, connection, 12, language, { USER: message.user.id, GUILD: message.guild.name });
        message.reply(response);
        const myServer = await client.guilds.cache.get("1061703062294626334");
        const channel = await myServer.channels.cache.get("1182046109707812925");
        const embed = await functions.createEmbed(functions, "Feedback", message.options.getString("message"), null);
        channel.send({ embeds: [embed] });
    }
}