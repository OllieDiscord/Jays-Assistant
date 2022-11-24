const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Eval code.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) => option.setName("code").setDescription("Code to evaluate.").setMaxLength(2000).setMinLength(5).setRequired(true)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { options, user } = interaction;

        const code = options.getString("code");

        try {
            const evaluatedCode = eval(code);

            const EvalEmbed = new MessageEmbed()
            .setColor("DARKER_GREY")
            .setFields(
                {
                    name: "Input",
                    value: `\`\`\`js\n${code}\`\`\``
                },
                {
                    name: "Result",
                    value: `\`\`\`js\n${evaluatedCode}\`\`\``
                }
            )

        interaction.reply({ embeds: [EvalEmbed] });
        } catch (error) {
            interaction.reply({ content: "An error occured, did you make any mistakes?", ephemeral: true });
        };
    },
};
