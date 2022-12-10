const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Default_Embed_Colour } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(option => option
            .setName('message')
            .setDescription('Poll message.')
            .setRequired(true)
            .setMaxLength(500)
            .setMinLength(1)
    )
    .addStringOption(option => option
            .setName('option1')
            .setDescription('Option 1.')
            .setRequired(true)
            .setMaxLength(500)
            .setMinLength(1)
    )
    .addStringOption(option => option
            .setName('option2')
            .setDescription('Option 2.')
            .setRequired(true)
            .setMaxLength(500)
            .setMinLength(1)
    ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { options, user } = interaction;

        const pollMessage = options.getString('message');
        const option1 = options.getString('option1');
        const option2 = options.getString('option2');

        const PollEmbed = new EmbedBuilder()
        .setColor(Default_Embed_Colour)
        .setTitle(`${pollMessage}`)
        .setFields(
            {
                name: 'Option 1',
                value: `> ${option1}`
            },
            {
                name: 'Option 2',
                value: `> ${option2}`
            }
        )
        .setTimestamp()

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('option-1-button').setLabel(`${option1}`).setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('option-2-button').setLabel(`${option2}`).setStyle(ButtonStyle.Primary)
        );

        interaction.reply({ content: 'Poll created.', ephemeral: true });
        interaction.channel.send({ embeds: [PollEmbed], components: [row] });
    },
};