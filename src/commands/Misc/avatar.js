const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Gets a users avatar.")
    .addUserOption((option) => option.setName("target").setDescription("User to get the avatar of.")),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {
        const { options } = interaction;

        const Target = options.getUser("target") || interaction.user;

        const AvatarEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setAuthor({ name: `${Target.tag}'s avatar`, iconURL: `${Target.displayAvatarURL()}` })
        .setImage(`${Target.displayAvatarURL({ dynamic: true, size: 512, format: "png" })}`)

        interaction.reply({ embeds: [AvatarEmbed] });
    },
};