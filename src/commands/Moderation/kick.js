const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { DM_EMBED_COLOUR, SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");
const randomstring = require("randomstring");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user from the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) => option.setName("target").setDescription("The user to kick.").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The ban reason.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, user, options } = interaction;

        const TargetUser = options.getUser("target");
        const TargetMember = await guild.members.fetch(TargetUser.id);
        const KickReason = options.getString("reason") || "No reason provided.";

        const LoggingChannel = guild.channels.cache.get("946156432057860103");
        const CaseId = randomstring.generate({ length: 18, charset: "numeric" });

        const CannotKickEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | You cannot kick Moderators/Admins.`)
        if (TargetMember.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [CannotKickEmbed] });

        const DMEmbed = new MessageEmbed()
        .setColor(DM_EMBED_COLOUR)
        .setTitle(`You have been kicked from ${guild.name}`)
        .setFields(
            {
                name: "Reason",
                value: `> ${KickReason}`
            },
        )
        .setFooter({ text: `Case: ${CaseId}` })

        await TargetUser.send({ embeds: [DMEmbed] }).catch(console.error);;

        await TargetMember.kick(KickReason).then(() => {
            const KickSuccessEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | <@${TargetUser.id}> has been kicked | \`${CaseId}\``)
            interaction.reply({ embeds: [KickSuccessEmbed] });
        });

        const LogEmbed = new MessageEmbed()
        .setColor("RED")
        .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
        .setDescription(`**Member**: <@${TargetUser.id}> | \`${TargetUser.id}\`\n**Action**: Kick\n**Reason**: ${BanReason}`)
        .setFooter({ text: `Case: ${CaseId}` })
        .setTimestamp()

        LoggingChannel.send({ embeds: [LogEmbed] });
    },
};
