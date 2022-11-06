const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("showcommands")
    .setDescription("Lists currently registered commands."),
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        const commandsList = [];
        client.commands.forEach(cmd => { commandsList.push(cmd.data.name) });
        
        const Embed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setTitle(`Registered Commands (${client.commands.size})`)
        .setDescription(`\`${commandsList.join(", ")}\``)

        interaction.reply({ embeds: [Embed] });
    },
};
