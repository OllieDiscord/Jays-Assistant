const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR, SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Send a suggestion.")
    .addStringOption((option) => option.setName("suggestion").setDescription("The suggestion.").setMaxLength(1000).setMinLength(2).setRequired(true))
    .addStringOption((option) => option.setName("type").setDescription("Suggestion type.").setRequired(true)
    .addChoices(
        { name: "Server", value: "Server" },
        { name: "Command", value: "Command" },
        { name: "Other", value: "Other" }
    )),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, user, options } = interaction;

        const Suggestion = options.getString("suggestion");
        const SuggestionType = options.getString("type");
        const SuggestionChannel = guild.channels.cache.get("1015951627137581088");

        let TypeChoice = "";

        switch (SuggestionType) {
            case "Server":
                TypeChoice = "Server";
                break;
            case "Command":
                TypeChoice = "Command";
                break;
            case "Other":
                TypeChoice = "Other";
                break;
        };

        const SuggestionEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        .setFields(
            {
                name: "Suggestion",
                value: `\`\`\`${Suggestion}\`\`\``
            },
            {
                name: "Type",
                value: `\`\`\`${TypeChoice}\`\`\``
            }
        )
        .setFooter({ text: "Want to suggest something? use /suggest" })
        .setTimestamp()

        const sentMessage = await SuggestionChannel.send({ embeds: [SuggestionEmbed] });
        await sentMessage.react("✅")
        await sentMessage.react("❌")

        interaction.reply({ content: "Suggestion has been posted.", ephemeral: true });
    },
};