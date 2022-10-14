const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("nick")
    .setDescription("Sets a users nickname or resets it.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .addUserOption((option) => option.setName("target").setDescription("The user whom to change the nickname of.").setRequired(true))
    .addStringOption((option) => option.setName("nickname").setDescription("The nickname.").setMaxLength(32).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const TargetUser = options.getUser("target");
        const TargetMember = await guild.members.fetch(TargetUser.id);
        const Nickname = options.getString("nickname");

        const CannotManageEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | You cannot manage Moderators/Admins.`)
        if (TargetMember.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [CannotManageEmbed] });

        if (!Nickname) {
            if (!TargetMember.nickname) {
                return interaction.reply({ content: "This user has no nickname set." });
            } else {
                await TargetMember.setNickname("");
                return interaction.reply({ content: "Nickname has been reset." });
            };
        } else {
            await TargetMember.setNickname(Nickname);
            return interaction.reply({ content: `Nickname has been set to \`${Nickname}\`` });
        };
    },
};