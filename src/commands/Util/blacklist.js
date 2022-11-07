const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

const database = require("../../core/db/schemas/Systems/BlacklistModel.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklist a user from using the bot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addUserOption((option) => option.setName("target").setDescription("The user to blacklist.").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The blacklist reason.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, guildId, options } = interaction;

        const TargetUser = options.getUser("target");
        const TargetMember = await guild.members.fetch(TargetUser.id);
        const BlacklistReason = options.getString("reason") || "No reason provided.";

        const UnableToBlacklistEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | Unable to blacklist this user.`)
        if (TargetMember.permissions.has("MANAGE_GUILD")) return interaction.reply({ embeds: [UnableToBlacklistEmbed] });

        if (await db.findOne({ GuildID: guildId, UserID: TargetUser.id })) {
            const AlreadyBlacklistedEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | This user is already blacklisted.`)
            return interaction.reply({ embeds: [AlreadyBlacklistedEmbed] });
        } else {
            const Blacklist = new database({ GuildID: guildId, UserID: TargetUser.id, Reason: BlacklistReason });
            Blacklist.save().then(() => {
                const SuccessEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | <@${TargetUser.id}> has been blacklisted. | \`${BlacklistReason}\``)
                interaction.reply({ embeds: [SuccessEmbed] });
            });
        };
    },
};
