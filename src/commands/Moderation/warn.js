const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { DM_EMBED_COLOUR, SUCCESS_EMOJI, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");
const randomstring = require("randomstring");

const database = require("../../core/db/schemas/Moderation/WarnModel.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warns a user")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) => option.setName("target").setDescription("The user to warn").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The warn reason.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, guildId, user, options, createdTimestamp } = interaction;

        const TargetUser = options.getUser("target");
        const WarnReason = options.getString("reason");

        const WarnDate = new Date(createdTimestamp).toDateString();
        const LoggingChannel = guild.channels.cache.get("946156432057860103");
        const CaseId = randomstring.generate({ length: 18, charset: "numeric" });

        const CannotWarnSelfEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | You cannot warn yourself.`)
        if (TargetUser.id === user.id) return interaction.reply({ embeds: [CannotWarnSelfEmbed] });

        const DMEmbed = new MessageEmbed()
        .setColor(DM_EMBED_COLOUR)
        .setTitle(`You have been warned in ${guild.name}`)
        .setFields(
            {
                name: "Reason",
                value: `> ${WarnReason}`
            }
        )
        .setFooter({ text: `Case: ${CaseId}` })

        await TargetUser.send({ embeds: [DMEmbed] }).catch(console.error);;

        database.findOne({ CaseID: CaseId, GuildID: guildId, UserID: TargetUser.id, UserTag: TargetUser.tag }, async (err, res) => {
            if (err) throw err;
            if (!res) {
                data = new database(
                    {
                        CaseID: CaseId,
                        GuildID: guild.id,
                        UserID: TargetUser.id,
                        UserTag: TargetUser.tag,
                        Content: [
                            {
                                Moderator: user.tag,
                                WarnDate: WarnDate,
                                Reason: WarnReason
                            }
                        ],
                    },
                );
            } else {
                const obj = {
                    Moderator: user.tag,
                    WarnDate: WarnDate,
                    Reason: WarnReason
                };
                data.Content.push(obj);
            };
            data.save();
        });

        const WarnSuccessEmbed = new MessageEmbed().setColor("GREEN").setDescription(`${SUCCESS_EMOJI} | <@${TargetUser.id}> has been warned | \`${CaseId}\``)
        interaction.reply({ embeds: [WarnSuccessEmbed] });

        const LogEmbed = new MessageEmbed()
        .setColor("ORANGE")
        .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL()}` })
        .setDescription(`**Member**: <@${TargetUser.id}> | \`${TargetUser.id}\`\n**Action**: Warn\n**Reason**: ${WarnReason}`)
        .setFooter({ text: `Case: ${CaseId}` })
        .setTimestamp()

        LoggingChannel.send({ embeds: [LogEmbed] });
    },
};