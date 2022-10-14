const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { SUCCESS_EMOJI } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear messages from a channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addNumberOption((option) => option.setName("amount").setDescription("Amount to clear.").setMaxValue(100).setMinValue(1).setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");

        const ClearSuccessEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | Successfully cleared \`${Amount}\` message(s)`)
        await channel.bulkDelete(Amount, true)
        interaction.reply({ embeds: [ClearSuccessEmbed], ephemeral: true });
    },
};