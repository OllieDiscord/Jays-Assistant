const { CommandInteraction, Client } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns with the bot's ping."),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        interaction.reply({ content: `Pong! \`${client.ws.ping}ms\`` });
    },
};