const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");
const randomstring = require("randomstring");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user from the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) => option.setName("id").setDescription("The id of the user to unban.").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for the unban.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, user, options } = interaction;

        const TargetID = options.getString("id");
        const UnbanReason = options.getString("reason") || "No reason provided."

        const LoggingChannel = guild.channels.cache.get("946156432057860103");
        const CaseId = randomstring.generate({ length: 18, charset: "numeric" });

        await guild.bans.fetch().then(async (bans) => {
            if (bans.size === 0) return interaction.reply({ content: "There are no bans listed.", ephemeral: true });
            const InvalidIDEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | There was no ban found with ID \`${TargetID}\``)
            const BanRemovedEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | <@${TargetID}> has been unbanned. | \`${CaseId}\``)

            let BannedID = bans.find((ban) => ban.user.id === TargetID);
            if (!BannedID) return interaction.reply({ embeds: [InvalidIDEmbed] });

            await guild.bans.remove(TargetID, UnbanReason).then(() => {
                const LogEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
                .setDescription(`**Member**: <@${TargetID}> - \`${TargetID}\`\n**Action**: Unban\n**Reason**: ${UnbanReason}`)
                .setFooter({ text: `Case: ${CaseId}` })
                .setTimestamp()

                interaction.reply({ embeds: [BanRemovedEmbed] });
                LoggingChannel.send({ embeds: [LogEmbed] });
            }).catch(console.error);
        }).catch(console.error);
    },
};
