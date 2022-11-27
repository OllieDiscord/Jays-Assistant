<<<<<<< HEAD
const database = require("../../db/schemas/Systems/BlockModel.js");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        const Blocked = await database.findOne({ GuildID: guildId, UserID: message.author.id });
        if (Blocked) {
            await message.delete();
        };
    });
=======
const database = require("../../core/db/schemas/Systems/BlockModel.js");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        const Blocked = await database.findOne({ GuildID: guildId, UserID: message.author.id });
        if (Blocked) {
            await message.delete();
        };
    });
>>>>>>> e873a0876cbd83d4445803e593450215d583b97a
};