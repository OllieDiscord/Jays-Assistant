const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
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

        let option1Votes = 0;
        let option2Votes = 0;

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
        .setFooter({ text: `Poll by: ${user.username}` })
        .setTimestamp()

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('option-1-button').setLabel(`${option1}`).setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('option-2-button').setLabel(`${option2}`).setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId('end-poll').setLabel('End').setStyle(ButtonStyle.Danger)
        );

        interaction.reply({ content: 'Poll created.', ephemeral: true });
        interaction.channel.send({ embeds: [PollEmbed], components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 15000 });

        collector.on('collect', i => {
            if (i.customId === 'option-1-button') {
                option1Votes + 1;

                i.update({ embeds: [PollEmbed.setDescription(`${option1} Votes: ${option1Votes}`)] });
            } else if (i.customId === 'option-2-button') {
                option2Votes + 1;

                i.update({ embeds: [PollEmbed.setDescription(`${option2} Votes: ${option2Votes}`)] });
            } else if (i.customId === 'end-poll') {
                if (!i.member.permissions.has('MANAGE_MESSAGES')) {

                } else {
                    i.update({ embeds: [PollEmbed.setTitle('Poll Ended').setColor('Red')], components: [] });
                };
            };
        });
    },
};