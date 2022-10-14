const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits, ChannelType } = require("discord-api-types/v10");
const { EMBED_COLOUR, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlocks a channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((option) => option.setName("channel").setDescription("The channel to unlock.").addChannelTypes(ChannelType.GuildText))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for unlocking the channel.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const Channel = options.getChannel("channel") || interaction.channel;
        const UnlockReason = options.getString("reason") || "No reason provided.";

        const AlreadyUnlockedEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | <#${Channel.id}> is already unlocked.`);
        if (Channel.permissionsFor(guild.id).has("SEND_MESSAGES") === null) return interaction.reply({ embeds: [AlreadyUnlockedEmbed] });

        Channel.permissionOverwrites.edit(guild.id, { SEND_MESSAGES: null });

        const UnlockedChannelEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()}` })
        .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
        .setDescription("This channel has been unlocked, you can all talk again.")
        .setFields({ name: "Reason", value: `${UnlockReason}` })

        Channel.send({ embeds: [UnlockedChannelEmbed] });
        interaction.reply({ content: "Channel has been unlocked.", ephemeral: true });
    },
};