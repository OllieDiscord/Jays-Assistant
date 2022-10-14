const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Information about the server."),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, guildId } = interaction;
        const guildOwner = (await guild.fetchOwner()).user.tag;

        const InfoEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()}`})
        .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
        .setFields(
            {
                name: "• Description",
                value: `\`\`\`${guild.description || "None"}\`\`\``
            },
            {
                name: "• Creation",
                value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`
            },
            {
                name: "• Members",
                value: `\`\`\`${guild.memberCount}\`\`\``
            },
            {
                name: "• ID",
                value: `\`\`\`${guildId}\`\`\``
            },
            {
                name: "• Moderation",
                value: `\`\`\`${guild.verificationLevel}\`\`\``,
                inline: true
            },
            {
                name: "• Boost Level",
                value: `\`\`\`${guild.premiumTier}\`\`\``,
                inline: true
            },
            {
                name: "• Owner",
                value: `\`\`\`${guildOwner}\`\`\``,
            },
            {
                name: "• Roles",
                value: `\`\`\`${guild.roles.cache.size}\`\`\``,
                inline: true
            },
            {
                name: "• Emojis",
                value: `\`\`\`${guild.emojis.cache.size}\`\`\``,
                inline: true
            },
            {
                name: "• Channels",
                value: `\`\`\`${guild.channels.cache.size}\`\`\``,
                inline: true
            },
            {
                name: "• Features",
                value: `\`\`\`${guild.features.join("\n") || "None"}\`\`\``
            }
        )

        interaction.reply({ embeds: [InfoEmbed] });
    },
};