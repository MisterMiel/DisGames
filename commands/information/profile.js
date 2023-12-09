module.exports = {
    data: {
        name: 'profile',
        message: false,
        options: [
            {
                name: "user",
                description: "user",
                type: 6,
                required: false
            }
        ],
        description: "A user",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {
        const language = await functions.getServerLanguage(functions, connection, message.guild.id);
        const response = await functions.getLanguageMessage(client, functions, connection, 12, language, { USER: message.user.id, GUILD: message.guild.name });
        const embed = await functions.createEmbed(functions, "Profile", response, null);
        message.reply({ embeds: [embed] });

    }
}