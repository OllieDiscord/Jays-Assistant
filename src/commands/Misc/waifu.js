const { CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Fetches a waifu (please kill me).")
    .addBooleanOption((option) => option.setName("nsfw").setDescription("Is it NSFW?").setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const IsNsfw = options.getBoolean("nsfw");

        if (IsNsfw) {
            if (!interaction.channel.nsfw) return interaction.reply({ content: "Must be in a NSFW channel, ya numpty.", ephemeral: true });

            let response = await axios.get(`https://api.waifu.im/random/?is_nsfw=true`);
            let data = response.data;
            const data_image = data.images[0].url;

            interaction.reply({ content: `${data_image}` });
        } else {
            let response = await axios.get(`https://api.waifu.im/random/?is_nsfw=false`);
            let data = response.data;
            const data_image = data.images[0].url;

            interaction.reply({ content: `${data_image}` });
        };
    },
};
