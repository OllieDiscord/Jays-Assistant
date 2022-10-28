const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { DM_EMBED_COLOUR, SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");
const randomstring = require("randomstring");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes a user.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) => option.setName("target").setDescription("The user to mute.").setRequired(true))
    .addStringOption((option) => option.setName("duration").setDescription("Duration of the mute (1d, 10m, 6h).").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The mute reason.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, user, options } = interaction;

        const TargetUser = options.getUser("target");
        const TargetMember = await guild.members.fetch(TargetUser.id);
        const MuteDuration = options.getString("duration");
        const MuteReason = options.getString("reason") || "No reason provided.";

        const LoggingChannel = guild.channels.cache.get("946156432057860103");
        const CaseId = randomstring.generate({ length: 18, charset: "numeric" });

        const CannotMuteEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | You cannot mute Moderators/Admins.`)
        if (TargetMember.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [CannotMuteEmbed] });

        const AlreadyMutedEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | This user is already muted.`)
        if (TargetMember.isCommunicationDisabled === true) return interaction.reply({ embeds: [AlreadyMutedEmbed] });

        const HitLimitEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | The maximum limit is **28d**.`)
        if (!ms(MuteDuration) || ms(MuteDuration) > ms("28d")) return interaction.reply({ embeds: [HitLimitEmbed] });

        const DMEmbed = new MessageEmbed()
        .setColor(DM_EMBED_COLOUR)
        .setTitle(`You have been muted in ${guild.name}`)
        .setFields(
            {
                name: "Reason",
                value: `> ${MuteReason}`
            },
            {
                name: "Appeal",
                value: "> https://forms.gle/2oweFFCMoDnY1Y8DA"
            }
        )
        .setFooter({ text: `Case: ${CaseId}` })

        await TargetUser.send({ embeds: [DMEmbed] }).catch(console.error);

        await TargetMember.timeout(ms(MuteDuration), MuteReason).then(() => {
            const MuteSuccessEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | <@${TargetUser.id}> has been muted | \`${CaseId}\``)
            interaction.reply({ embeds: [MuteSuccessEmbed] });
        });

        const LogEmbed = new MessageEmbed()
        .setColor("YELLOW")
        .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
        .setDescription(`**Member**: <@${TargetUser.id}> | \`${TargetUser.id}\`\n**Action**: Mute\n**Expires**: <t:${parseInt(TargetMember.communicationDisabledUntilTimestamp / 1000)}:R>\n**Reason**: ${MuteReason}`)
        .setFooter({ text: `Case: ${CaseId}` })
        .setTimestamp()
        LoggingChannel.send({ embeds: [LogEmbed] });
    },
};
