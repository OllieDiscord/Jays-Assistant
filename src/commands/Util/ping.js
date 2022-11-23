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
    async execute(interaction, client) {
        const { createdTimestamp } = interaction;

        const sentMessage = await interaction.reply({ content: "Pinging..", fetchReply: true });
        const latency = sentMessage.createdTimestamp - createdTimestamp;

        interaction.editReply({ content: `Latency: \`${latency}\`ms\nAPI Latency: \`${Math.round(client.ws.ping)}ms\``});
    },
};
