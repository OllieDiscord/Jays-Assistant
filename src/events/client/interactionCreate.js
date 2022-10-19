const { CommandInteraction, Client } = require("discord.js");

const database = require("../../core/db/schemas/Systems/BlacklistModel.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const { guildId, user } = interaction;

    const Blacklisted = await database.findOne({ GuildID: guildId, UserID: user.id });
    if (Blacklisted) return interaction.reply({ content: `You are blacklisted.\n> Reason: \`${Blacklisted.Reason}\`` });

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        interaction.reply({ content: `An error occured whilst trying to run **${interaction.commandName}**.`, ephemeral: true });
        console.log(error);
    };
  },
};
