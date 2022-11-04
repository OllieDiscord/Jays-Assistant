const { ModalSubmitInteraction, Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { ButtonStyle, ComponentType } = require("discord-api-types/v10");
const { EMBED_COLOUR } = require("../../core/db/data/DesignOptions.json");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {ModalSubmitInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.isModalSubmit() || !interaction.customId === "confession-modal") return;

    const { user } = interaction;

    const ConfessionDescription = interaction.fields.getTextInputValue("confession-description");

    const ConfessionEmbed = new MessageEmbed().setColor(EMBED_COLOUR).setTimestamp();
    const ConfessionsChannel = client.channels.cache.get("929378716902117471");

    const ButtonRow = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("set-anon").setLabel("Yes").setStyle(ButtonStyle.Success),
        new MessageButton().setCustomId("no-anon").setLabel("No").setStyle(ButtonStyle.Secondary)
    )

    interaction.reply({ content: "Would you like to send this anonymously?", components: [ButtonRow], ephemeral: true });

    const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 5000 });

    collector.on("collect", i => {
        if (i.customId === "set-anon") {
            ConfessionEmbed
            .setTitle("[Anonymous] Confession")
            .setDescription(ConfessionDescription);
            
            ConfessionsChannel.send({ embeds: [ConfessionEmbed] });
            return interaction.editReply({ content: "Confession sent [Anonymous].", components: [], ephemeral: true });
        } else if (i.customId === "no-anon") {
            ConfessionEmbed
            .setTitle("Confession")
            .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
            .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(ConfessionDescription)
            
            ConfessionsChannel.send({ embeds: [ConfessionEmbed] });
            return interaction.editReply({ content: "Confession sent [Non-Anonymous].", components: [], ephemeral: true });
        };
    });
  },
};
