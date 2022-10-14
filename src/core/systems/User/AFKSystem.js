const { ChannelType } = require("discord-api-types/v10");
const database = require("../../db/schemas/Systems/AFKModel.js");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || message.channel.type === ChannelType.DM) return;

        const data = await database.findOne({ GuildID: message.guild.id, UserID: message.author.id });
        if (data) {
            await database.deleteOne({ GuildID: message.guild.id, UserID: message.author.id });
            message.reply({ content: `Welcome back <@${message.author.id}>, your afk has been removed.` });
        };

        if (message.mentions.members.size) {
            message.mentions.forEach((m) => {
                database.findOne({ GuildID: message.guild.id, UserID: m.author.id }, async (err, data) => {
                    if (err) throw err;
                    if (data) {
                        message.reply({ content: `${m.user.tag} is currently afk.\n> Reason: \`${data.Status}\n> Since: <t:\`${data.Time}:R>`})
                    };
                });
            });
        };
    });
};