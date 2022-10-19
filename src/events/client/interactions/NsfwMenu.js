const { SelectMenuInteraction } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const axios = require("axios");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {SelectMenuInteraction} interaction
   */       
  async execute(interaction, client) {
    if (!interaction.isSelectMenu() || !interaction.customId === "nsfw-menu") return;
    await interaction.deferUpdate();

    let choice = "";
    interaction.values.forEach(async (value) => { choice = value });

    if (choice === "waifu-selected") {
        let response = await axios.get("https://api.waifu.pics/nsfw/waifu");
        let data = response.data;
        let image_content = data.url;

        wait(5000);
        await interaction.editReply({ content: `${image_content}`, components: [] });
    };
  },
};
