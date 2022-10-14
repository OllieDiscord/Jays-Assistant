const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Gets the current amount of members in the server."),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {
        const { guild } = interaction;

        const TotalHumans = guild.members.cache.filter((m) => !m.user.bot).size;
        const TotalBots = guild.members.cache.filter((m) => m.user.bot).size;
        const TotalMembers = guild.memberCount;

        const InfoEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()}` })
        .setFields(
            {
                name: "• Humans",
                value: `\`\`\`${TotalHumans}\`\`\``,
                inline: true
            },
            {
                name: "• Bots",
                value: `\`\`\`${TotalBots}\`\`\``,
                inline: true
            },
            {
                name: "• Total",
                value: `\`\`\`${TotalMembers}\`\`\``
            }
        )

        interaction.reply({ embeds: [InfoEmbed] });
    },
};