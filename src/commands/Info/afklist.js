const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

const database = require("../../core/db/schemas/Systems/AFKModel.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("afk-list")
    .setDescription("List of people who are currently afk."),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guildId } = interaction;

        const data = await database.find({ GuildID: guildId });
        if (!data) return interaction.reply({ content: "There are no users afk." });

        const AFKListEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setTitle("AFK List")
        .setDescription(`${data.map((user) => `<@${user.UserID}> - \`${user.Status}\` Since <t:${Status.Time}:R>`).join("\n")}`)

        interaction.reply({ embeds: [AFKListEmbed] });
    },
};