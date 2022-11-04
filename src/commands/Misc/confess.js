const { CommandInteraction, MessageActionRow, Modal, TextInputComponent } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");
const { TextInputStyle } = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("confess")
    .setDescription("Send a confession."),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const ConfessionModal = new Modal().setCustomId("confession-modal").setTitle("Confession")

        const DescriptionComponent = new TextInputComponent()
        .setCustomId("confession-description")
        .setStyle(TextInputStyle.Paragraph)
        .setLabel("Description")
        .setPlaceholder("Write your confession")
        .setMaxLength(4000)
        .setMinLength(1)
        .setRequired(true)

        const row1 = new MessageActionRow().addComponents(DescriptionComponent);
        ConfessionModal.addComponents(row1);

        interaction.showModal(ConfessionModal);
    },
};