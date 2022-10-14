const { CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits, ChannelType } = require("discord-api-types/v10");
const { EMBED_COLOUR, ERROR_EMOJI } = require("../../core/db/data/DesignOptions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks a channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption((option) => option.setName("channel").setDescription("The channel to lock.").addChannelTypes(ChannelType.GuildText))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for locking the channel.").setMaxLength(1000).setMinLength(2)),
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        const Channel = options.getChannel("channel") || interaction.channel;
        const LockReason = options.getString("reason") || "No reason provided.";

        const AlreadyLockedEmbed = new MessageEmbed().setColor("RED").setDescription(`${ERROR_EMOJI} | <#${Channel.id}> is already locked.`);
        if (Channel.permissionsFor(guild.id).has("SEND_MESSAGES") === false) return interaction.reply({ embeds: [AlreadyLockedEmbed] });

        Channel.permissionOverwrites.edit(guild.id, { SEND_MESSAGES: false });

        const LockedChannelEmbed = new MessageEmbed()
        .setColor(EMBED_COLOUR)
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL()}` })
        .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
        .setDescription("This channel has been locked, you have not been muted so please do not dm a staff member.")
        .setFields({ name: "Reason", value: `${LockReason}` })

        Channel.send({ embeds: [LockedChannelEmbed] });
        interaction.reply({ content: "Channel has been locked.", ephemeral: true });
    },
};