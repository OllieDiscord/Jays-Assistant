const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages from a channel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addNumberOption(option => option
            .setName('amount')
            .setDescription('Amount to clear.')
            .setMaxValue(100)
            .setMinValue(1)
            .setRequired(true)
    ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { channel, options } = interaction;

        const Amount = options.getNumber('amount');

        await channel.bulkDelete(Amount, true);
        interaction.reply({ content: `Cleared ${Amount} message(s)`, ephemeral: true });
    },
};