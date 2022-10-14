const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

const database = require("../../core/db/schemas/Moderation/WarnModel.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("case")
    .setDescription("View a case.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addStringOption((option) => option.setName("id").setDescription("The case id.").setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const ProvidedId = options.getString("id");

        const data = await database.findOne({ CaseID: ProvidedId });

        const CaseNotFoundEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | Could not find a case with this id.`)
        if (!data) return interaction.reply({ embeds: [CaseNotFoundEmbed] });

        const CaseEmbed = new MessageEmbed()
        .setColor("#ff5c92")
        .setFields(
            {
                name: "• User",
                value: `\`\`\`${data.UserTag}\`\`\``,
                inline: true
            },
            {
                name: "• Moderator",
                value: `\`\`\`${data.Content.map((w) => `${w.Moderator}`)}\`\`\``,
                inline: true
            },
            {
                name: "• Reason",
                value: `\`\`\`${data.Content.map((w) => `${w.Reason}`)}\`\`\``,
                inline: true
            },
            {
                name: "• Issued on",
                value: `\`\`\`${data.Content.map((w) => `${w.WarnDate}`)}\`\`\``
            }
        )
        .setFooter({ text: `ID: ${ProvidedId}` })

        interaction.reply({ embeds: [CaseEmbed] });
    },
};