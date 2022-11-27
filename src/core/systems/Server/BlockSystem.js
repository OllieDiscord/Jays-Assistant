const database = require("../../db/schemas/Systems/BlockModel.js");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        const Blocked = await database.findOne({ GuildID: guildId, UserID: message.author.id });
        if (Blocked) await message.delete();
    });
}
