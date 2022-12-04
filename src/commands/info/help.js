const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Brings up the help menu.'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const HomeEmbed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Help')
        .setDescription('You can use `/` to bring up all the commands you have permission to use. Navigate through command categories using the menu.')

        const InfoCommandsEmbed = new EmbedBuilder()
        .setColor('DarkerGrey')
        .setTitle('Info Commands')
        .setDescription(
            '**/help**: Brings up the help menu.',
            '**/membercount**: Gets the current number of members.',
            '**/serverinfo**: Gets information on the server.',
            '**/userinfo**: Gets information on a user.'
        )

        const MiscCommandsEmbed = new EmbedBuilder()
        .setColor('DarkerGrey')
        .setTitle('Misc Commands')
        .setDescription(
            '**/avatar**: Gets a user\s avatar.'
        )

        const ModerationCommandsEmbed = new EmbedBuilder()
        .setColor('DarkerGrey')
        .setTitle('Moderation Commands')
        .setDescription(
            '**/ban**: Ban a user from the server.',
            '**/clear**: Clear messages from a channel.',
            '**/kick**: Kick a user from the server.',
            '**/mod**: Moderate a user\s name.',
            '**/mute**: Mutes a user.',
            '**/nick**: Change or reset a member\s nickname.',
            '**/slowmode**: Sets a channels slowmode.',
            '**/unban**: Unbans a user from the server.',
            '**/warn**: Warns a user.'
        )

        const UtilCommandsEmbed = new EmbedBuilder()
        .setColor('DarkerGrey')
        .setTitle('Util Commands')
        .setDescription(
            '**/debug**: Returns with bot stats.',
            '**/ping**: Returns with the bot\s ping.'
        )

        const menu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('menu-select')
            .setPlaceholder('Category')
            .addOptions(
                {
                    label: '🏠 Home',
                    value: 'home-selected',
                    default: true
                },
                {
                    label: '📜 Info',
                    value: 'info-selected'
                },
                {
                    label: '📌 Misc',
                    value: 'misc-selected'
                },
                {
                    label: '🔧 Moderation',
                    value: 'mod-selected'
                },
                {
                    label: '💻 Util',
                    value: 'util-selected'
                }
            )
        )

        const sentMsg = await interaction.reply({ embeds: [HomeEmbed], components: [menu] });
        const collector = sentMsg.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 150000 });

        collector.on('collect', i => {
            if (i.customId === 'menu-select') {
                let selection = '';
                i.values.forEach((value) => { selection = value });

                if (selection === 'home-selected') {
                    i.update({ embeds: [HomeEmbed] });
                } else if (selection === 'info-selected') {
                    i.update({ embeds: [InfoCommandsEmbed] });
                } else if (selection === 'misc-selected') {
                    i.update({ embeds: [MiscCommandsEmbed] });
                } else if (selection === 'mod-selected') {
                    i.update({ embeds: [ModerationCommandsEmbed] });
                } else if (selection === 'util-selected') {
                    i.update({ embeds: [UtilCommandsEmbed] });
                };
            };
        });
    },
};