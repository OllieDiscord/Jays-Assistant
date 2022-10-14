const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get information about a user.")
    .addUserOption((option) => option.setName("target").setDescription("User to get information about.")),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const TargetUser = options.getUser("target") || interaction.user;
        const TargetMember = await guild.members.fetch(TargetUser.id);
        
        const UserBanner = (await client.users.fetch(TargetUser, { force: true })).bannerURL({ dynamic: true, size: 2048 });

        const InfoEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setAuthor({ name: `${TargetUser.tag}`, iconURL: `${TargetUser.displayAvatarURL({ dynamic: true })}`})
        .setThumbnail(`${TargetUser.displayAvatarURL({ dynamic: true })}`)
        .setImage(UserBanner || null)
        .setFields(
            {
                name: "• Username",
                value: `\`\`\`${TargetUser.tag}\`\`\``,
                inline: true
            },
            {
                name: "• ID",
                value: `\`\`\`${TargetUser.id}\`\`\``,
                inline: true
            },
            {
                name: "• Creation",
                value: `<t:${parseInt(TargetUser.createdTimestamp / 1000)}:R>`
            },
            {
                name: "• Joined Server",
                value: `<t:${parseInt(TargetMember.joinedTimestamp / 1000)}:R>`
            },
            {
                name: "• Type",
                value: `\`\`\`${TargetUser.bot ? "Bot" : "User"}\`\`\``,
                inline: true
            },
            {
                name: "• Nickname",
                value: `\`\`\`${TargetMember.nickname || "None"}\`\`\``,
                inline: true
            },
            {
                name: `• Roles [${TargetMember.roles.cache.size - 1}]`,
                value: `${TargetMember.roles.cache.sort((a, b) => b.position - a.position).map((r) => r).join(" ").replace("@everyone", " ")}`
            }
        )

        interaction.reply({ embeds: [InfoEmbed] });
    },
};