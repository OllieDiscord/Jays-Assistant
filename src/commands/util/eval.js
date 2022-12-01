const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, codeBlock } = require('discord.js');
const { safeEval } = require('../../api/functions/safeEval');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Eval code.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option => option
        .setName('code')
        .setDescription('Code to evaluate.')
        .setMaxLength(1000)
        .setMinLength(10)
        .setRequired(true)
    ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const code = options.getString('code');

        try {
            const evaluatedCode = safeEval(code);

            const EvalEmbed = new EmbedBuilder()
            .setColor('DarkerGrey')
            .setFields(
                {
                    name: 'Input',
                    value: codeBlock('js', code)
                },
                {
                    name: 'Output',
                    value: codeBlock('js', evaluatedCode)
                }
            )

            interaction.reply({ embeds: [EvalEmbed] });
        } catch (error) {
            interaction.reply({ content: `${codeBlock(error)}`, ephemeral: true });
        }
    },
};