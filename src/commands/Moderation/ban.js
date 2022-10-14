const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { DM_EMBED_COLOUR, SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");
const randomstring = require("randomstring");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user from the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) => option.setName("target").setDescription("The user to ban.").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The ban reason.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, user, options } = interaction;

        const TargetUser = options.getUser("target");
        const TargetMember = await guild.members.fetch(TargetUser.id);
        const BanReason = options.getString("reason") || "No reason provided.";

        const LoggingChannel = guild.channels.cache.get("946156432057860103");
        const CaseId = randomstring.generate({ length: 18, charset: "numeric" });

        const CannotBanEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | You cannot ban Moderators/Admins.`)
        if (TargetMember.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [CannotBanEmbed] });

        const DMEmbed = new MessageEmbed()
        .setColor(DM_EMBED_COLOUR)
        .setTitle(`You have been banned from ${guild.name}`)
        .setFields(
            {
                name: "Reason",
                value: `> ${BanReason}`
            },
            {
                name: "Appeal",
                value: `> https://forms.gle/2oweFFCMoDnY1Y8DA`
            }
        )
        .setFooter({ text: `Case: ${CaseId}` })

        await TargetUser.send({ embeds: [DMEmbed] }).catch(console.error);

        await TargetMember.ban({ days: 1, reason: BanReason }).then(() => {
            const BanSuccessEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | <@${TargetUser.id}> has been banned | \`${CaseId}\``)
            interaction.reply({ embeds: [BanSuccessEmbed] });
        });

        const LogEmbed = new MessageEmbed()
        .setColor("RED")
        .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
        .setDescription(`**Member**: <@${TargetUser.id}> | \`${TargetUser.id}\`\n**Action**: Ban\n**Reason**: ${BanReason}`)
        .setFooter({ text: `Case: ${CaseId}` })
        .setTimestamp()

        LoggingChannel.send({ embeds: [LogEmbed] });
    },
};
