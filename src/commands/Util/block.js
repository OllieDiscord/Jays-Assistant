const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

const database = require("../../core/db/schemas/Systems/BlockModel.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("block")
    .setDescription("Blocks a user from speaking.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addUserOption((option) => option.setName("target").setDescription("The user to block.").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The block reason.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, guildId, options } = interaction;

        const TargetUser = options.getUser("target");
        const TargetMember = await guild.members.fetch(TargetUser.id);
        const BlockReason = options.getString("reason") || "No reason provided.";

        const UnableToBlockEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | Unable to block this user.`)
        if (TargetMember.permissions.has("MANAGE_GUILD")) return interaction.reply({ embeds: [UnableToBlockEmbed] });

        if (await database.findOne({ GuildID: guildId, UserID: TargetUser.id })) {
            const AlreadyBlacklistedEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | This user is already blocked.`)
            return interaction.reply({ embeds: [AlreadyBlacklistedEmbed] });
        } else {
            const codeBlock = new database({ GuildID: guildId, UserID: TargetUser.id, Reason: BlockReason });
            codeBlock.save().then(() => {
                const SuccessEmbed = new MessageEmbed().setColor("DARKER_GREY").setDescription(`<@${TargetUser.id}> has been blocked from speaking, any messages they send will automatically be deleted.`)
                .setFields({ name: "Reason", value: `${BlockReason}`})
                interaction.reply({ embeds: [SuccessEmbed] });
            });
        };
    },
};
