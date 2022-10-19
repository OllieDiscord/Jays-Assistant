const { Client } =  require("discord.js");
const { ActivityType } =  require("discord-api-types/v10");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    async execute(client) {
        console.log(`[ONLINE] Logged in as ${client.user.tag}`);
        client.user.setActivity({ name: "Cord Community", type: ActivityType.Watching });
    },
};
