const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

const database = require("../../core/db/schemas/Moderation/WarnModel.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rmpunish")
    .setDescription("Removes a punishment.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addStringOption((option) => option.setName("id").setDescription("The punishment id").setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const ProvidedId = options.getString("id");

        const CaseNotFoundEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | Could not find a punishment with this id.`)

        const data = await database.findOne({ CaseID: ProvidedId });
        if (!data) return interaction.reply({ embeds: [CaseNotFoundEmbed] });
        data.delete();

        const PunishmentRemovedEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | Punishment with ID \`${ProvidedId}\` has been deleted.`)
        interaction.reply({ embeds: [PunishmentRemovedEmbed] });
    },
};