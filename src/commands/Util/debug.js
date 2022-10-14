const { CommandInteraction, Client, MessageEmbed, version } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("debug")
    .setDescription("Nerd stats.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const DebugEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setFields(
            {
                name: "• Ping",
                value: `\`\`\`${client.ws.ping}ms\`\`\``,
                inline: true
            },
            {
                name: "• Uptime",
                value: `\`\`\`${ms(client.uptime)}\`\`\``,
                inline: true
            },
            {
                name: "• Platform",
                value: `\`\`\`${process.platform}\`\`\``,
                inline: true
            },
            {
                name: "• Node Version",
                value: `\`\`\`${process.version}\`\`\``,
                inline: true
            },
            {
                name: "• Discord.js Version",
                value: `\`\`\`v${version}\`\`\``,
                inline: true
            },
            {
                name: "• Total Commands",
                value: `\`\`\`${client.commands.size}\`\`\``,
                inline: true
            }
        )

        interaction.reply({ embeds: [DebugEmbed] });
    },
};