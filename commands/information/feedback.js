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
        //console log the user who sent the feedback
        console.log(message.user.id);
        //console log all the roles the user has
        let role = await client.guilds.cache.get(message.guild.id).roles.cache.find(role => role.id === "1062381296799731792");
        console.log(role)
        //console.log(message.member.roles.has(role));

        console.log(message.member.roles.cache.has('1062381296799731792'))

        // const language = await functions.getServerLanguage(functions, connection, message.guild.id);
        // const response = await functions.getLanguageMessage(client, functions, connection, 12, language, { USER: message.user.id, GUILD: message.guild.name });
        // message.reply(response);
        // const myServer = await client.guilds.cache.get("1061703062294626334");
        // const channel = await myServer.channels.cache.get("1182046109707812925");
        // const embed = await functions.createEmbed(functions, "Feedback", message.options.getString("message"), null);
        // channel.send({ embeds: [embed] });
    }
}