const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { SUCCESS_EMOJI } = require("../../core/db/data/DesignOptions.json");

const database = require("../../core/db/schemas/Systems/AFKModel.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("afk")
    .setDescription("Set yourself afk.")
    .addStringOption((option) => option.setName("status").setDescription("AFK status").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, user, options, createdTimestamp } = interaction;

        const AFKStatus = options.getString("status") || "No reason provided.";

        await database.findOneAndUpdate(
            { GuildID: guild.id, UserID: user.id },
            { Status: AFKStatus, Time: parseInt(createdTimestamp / 1000) },
            { new: true, upsert: true }
        )

        const AFKSetEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | You are now afk for the following reason: **${AFKStatus}**`)
        interaction.reply({ embeds: [AFKSetEmbed] });
    },
};