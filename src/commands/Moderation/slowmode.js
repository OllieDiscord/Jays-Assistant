const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Sets a channels slowmode.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption((option) => option.setName("duration").setDescription("Slowmode duration.")),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {
        const { channel, options } = interaction;

        const SlowmodeDuration = options.getString("duration");
        if (!SlowmodeDuration) return interaction.reply({ content: `Current slowmode for this channel is: \`${channel.rateLimitPerUser}\`` });
        
        if (SlowmodeDuration === "0") {
            if (!channel.rateLimitPerUser) {
                return interaction.reply({ content: "There is no slowmode set for this channel." });
            } else {
                const SlowmodeDisabledEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | Slowmode for <#${channel.id}> has been disabled.`)
                channel.setRateLimitPerUser(0)
                interaction.reply({ embeds: [SlowmodeDisabledEmbed] });
            };
        } else {
            const SlowmodeSetEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | Slowmode for <#${channel.id}> has been set to **${SlowmodeDuration}**`)
            channel.setRateLimitPerUser(SlowmodeDuration)
            interaction.reply({ embeds: [SlowmodeSetEmbed] });
        };
    },
};