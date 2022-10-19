const { CommandInteraction, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("I have no idea."),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (!interaction.channel.nsfw) return interaction.reply({ content: "Must be used in a NSFW channel, ya numpty.", ephemeral: true });
        
        const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId("nsfw-menu")
            .setPlaceholder("Select a category.")
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions(
                {
                    label: "Waifu",
                    value: "waifu-selected"
                },
            )
        )

        interaction.reply({ components: [row] });
    },
};
