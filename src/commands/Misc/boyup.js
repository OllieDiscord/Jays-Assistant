const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("boy-up")
    .setDescription("Add a user to The Boys role.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addUserOption((option) => option.setName("target").setDescription("User to add.").setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const TargetUser = options.getUser("target");
        const TargetMember = await guild.members.fetch(TargetUser.id);
        const MainRole = guild.roles.cache.get("1038177626977734687");

        if (TargetMember.roles.cache.has("1038177626977734687")) return interaction.reply({ content: "User already has the role.", ephemeral: true });
        if (!TargetMember.manageable) return interaction.reply({ content: "Unable to add the role to this user.", ephemeral: true });

        TargetMember.roles.add(MainRole).then(() => {
            interaction.reply({ content: "Role has been added.", ephemeral: true });
        });
    },
};