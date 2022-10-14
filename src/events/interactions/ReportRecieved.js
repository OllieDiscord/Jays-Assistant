const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (!interaction.isModalSubmit() || !interaction.customId === "report-modal") return;

        const { user } = interaction;

        const UserInput = interaction.fields.getTextInputValue("report-user");
        const ReasonInput = interaction.fields.getTextInputValue("report-reason");
        const ProofInput = interaction.fields.getTextInputValue("report-proof");
        
        const ReportsChannel =  client.channels.cache.get("1015976777849516052");

        const ReportEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setAuthor({ name: "Reports", iconURL: `${client.user.displayAvatarURL()}` })
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        .setFields(
            {
                name: "• Reporter",
                value: `<@${user.id}> | ${user.id}`
            },
            {
                name: "• User",
                value: `\`\`\`${UserInput}\`\`\``
            },
            {
                name: "• Reason",
                value: `\`\`\`${ReasonInput}\`\`\``
            },
            {
                name: "• Proof",
                value: `\`\`\`${ProofInput}\`\`\``
            }
        )

        ReportsChannel.send({ embeds: [ReportEmbed] });
        interaction.reply({ content: "Report submitted.", ephemeral: true });
    },
};