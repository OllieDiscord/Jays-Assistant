const { CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ComponentType, ChannelType, ButtonStyle } = require("discord-api-types/v10");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Opens a ticket."),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const { guild, user, channel } = interaction;

        const ticketCategory = "1038764233699115078";

        const ticketChoices = new MessageActionRow().addComponents(
            new MessageSelectMenu().setCustomId("ticket-menu").setPlaceholder("Choose an option").setMaxValues(1).setMinValues(1).addOptions(
                {
                    label: "Report",
                    description: "Report a user.",
                    value: "report-ticket"
                },
                {
                    label: "Support",
                    description: "General server support.",
                    value: "support-ticket"
                }
            )
        )

        interaction.reply({ content: "Ticket type:", components: [ticketChoices], ephemeral: true });

        const collector = channel.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 5000 });

        collector.on("collect", i => {
            if (i.customId === "ticket-menu") {
                let selectedChoice = "";
                i.values.forEach((value) => { selectedChoice = value });

                if (selectedChoice === "report-ticket") {
                    const ReportEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Report Ticket")
                    .setDescription("While you wait for a staff member to respond, explain your issue. Include: \n• Username\n• What Happened\n • Proof")

                    guild.channels.create(`ticket-${user.username}`, {
                        type: ChannelType.GuildText,
                        parent: ticketCategory,
                        permissionOverwrites: [
                            {
                                id: guild.id,
                                deny: ["VIEW_CHANNEL"]
                            },
                            {
                                id: user.id,
                                allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"]
                            },
                            {
                                id: "929382693916008478",
                                allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "USE_APPLICATION_COMMANDS"]
                            }
                        ]
                    }).then(ticketChannel => {
                        const controlButtons = new MessageActionRow().addComponents(
                            new MessageButton().setCustomId("close-ticket").setLabel("Close").setStyle(ButtonStyle.Danger),
                        )

                        ticketChannel.send({ embeds: [ReportEmbed], components: [controlButtons] });
                        interaction.editReply({ content: `Ticket opened: <#${ticketChannel.id}>`, components: [], ephemeral: true });

                        const controlCollector = ticketChannel.createMessageComponentCollector({ componentType: ComponentType.Button });

                        controlCollector.on("collect", controlType => {
                            if (!controlType.member.permissions.has("MANAGE_MESSAGES")) return;

                            if (controlType.customId === "close-ticket") ticketChannel.delete();
                        });
                    });
                } else if (selectedChoice === "support-ticket") {
                    const SupportEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("Support Ticket")
                    .setDescription("While you wait for a staff member to respond, explain your issue.")

                    guild.channels.create(`ticket-${user.username}`, {
                        type: ChannelType.GuildText,
                        parent: ticketCategory,
                        permissionOverwrites: [
                            {
                                id: guild.id,
                                deny: ["VIEW_CHANNEL"]
                            },
                            {
                                id: user.id,
                                allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS"]
                            },
                            {
                                id: "929382693916008478",
                                allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "ATTACH_FILES", "EMBED_LINKS", "USE_APPLICATION_COMMANDS"]
                            }
                        ]
                    }).then(ticketChannel => {
                        const controlButtons = new MessageActionRow().addComponents(
                            new MessageButton().setCustomId("close-ticket").setLabel("Close").setStyle(ButtonStyle.Danger),
                        )

                        ticketChannel.send({ embeds: [SupportEmbed], components: [controlButtons] });
                        interaction.editReply({ content: `Ticket opened: <#${ticketChannel.id}>`, components: [], ephemeral: true });

                        const controlCollector = ticketChannel.createMessageComponentCollector({ componentType: ComponentType.Button });

                        controlCollector.on("collect", controlType => {
                            if (!controlType.member.permissions.has("MANAGE_MESSAGES")) return;

                            if (controlType.customId === "close-ticket") ticketChannel.delete();
                        });
                    });
                };
            };
        });
    },
};
