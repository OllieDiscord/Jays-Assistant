const { CommandInteraction, MessageActionRow, Modal, TextInputComponent } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Report a user."),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const ReportModal = new Modal().setCustomId("report-modal").setTitle("Report");

        const UserInput = new TextInputComponent()
        .setCustomId("report-user")
        .setLabel("User (e.g: wumpus#0001)")
        .setPlaceholder("User ID / Username")
        .setStyle("SHORT")
        .setMinLength(2)
        .setMaxLength(32)
        .setRequired(true)
        
        const ReasonInput = new TextInputComponent()
        .setCustomId("report-reason")
        .setLabel("Reason")
        .setPlaceholder("Reason for report")
        .setStyle("PARAGRAPH")
        .setMinLength(2)
        .setMaxLength(1000)
        .setRequired(true)

        const ProofInput = new TextInputComponent()
        .setCustomId("report-proof")
        .setLabel("User (e.g: wumpus#0001)")
        .setPlaceholder("User ID / Username")
        .setStyle("SHORT")
        .setMinLength(2)
        .setMaxLength(32)
        .setRequired(true)

        const firstActionRow = new MessageActionRow().addComponents(UserInput);
        const secondActionRow = new MessageActionRow().addComponents(ReasonInput);
        const thirdActionRow = new MessageActionRow().addComponents(ProofInput);

        ReportModal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
        await interaction.showModal(ReportModal);
    },
};