const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'leaderboard',
        message: false,
        options: [],
        description: "A minigame",
        permissions: 0,
    },
    run: async function (client, functions, connection, message) {

        const data = await functions.runQuery(functions, connection, `SELECT serverID, SUM(points) as total_points FROM points WHERE gameID >= 0  GROUP BY serverID ORDER BY total_points DESC LIMIT 10`, false);
        let servers = "";
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            let serverName = await client.guilds.cache.get(data[i].serverID);
            if(!serverName) serverName = { name: "Unknown" };
            if (i <= 2) {
                servers = servers + "```" + `${i + 1}. ${serverName.name} - ${data[i].total_points}` + "```\n";
            } else {
                servers = servers + `${i + 1}. ${serverName.name} - ${data[i].total_points}\n`;
            }

        }
        const embed = await functions.createEmbed(functions, "Leaderboard Servers", servers, null);
        const msg = await message.channel.send({ embeds: [embed] });

    }
}