const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");
const randomstring = require("randomstring");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mod")
    .setDescription("Moderate a users name.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .addUserOption((option) => option.setName("target").setDescription("The user to moderate.").setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const TargetUser = options.getUser("target");
        const TargetMember = await guild.members.fetch(TargetUser.id);

        const CannotModerateEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | You cannot moderate Moderators/Admins.`)
        if (TargetMember.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ embeds: [CannotModerateEmbed] });

        const ModeratedNickname_ID = randomstring.generate({ length: 5, charset: "alphanumeric" });
        await TargetMember.setNickname(`Moderated Nickname - ${ModeratedNickname_ID}`);

        const ModerateSuccessEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | Successfully moderated name with ID \`${ModeratedNickname_ID}\``)
        interaction.reply({ embeds: [ModerateSuccessEmbed] });
    },
};