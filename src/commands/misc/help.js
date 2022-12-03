const { ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');
const Discord = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
const { Default_Embed_Colour } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Brings up the help menu.'),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const embed = new Discord.EmbedBuilder()
        embed
        .setTitle('Hey!')
        .setDescription("Use `/` to bring up all the commands.\nUse the Drop Down Menu given below to navigate through the help menu")
        .setColor("Aqua")
        .setTimestamp()
        .setFooter({text:`Requested by ${interaction.user.tag}`}) 
        const embed2 = new Discord.EmbedBuilder()
        embed2
        .setTitle("Miscellanous Commands")
        .setDescription(
            `**/avatar:** User to get the avatar from..\n` +
            `**/help:** Brings up the help menu.!\n`
        )
        .setColor("Yellow")
        .setFooter({text:`Requested by ${interaction.user.tag}`}) 
        .setTimestamp()
        const embed3 = new Discord.EmbedBuilder()
        embed3
        .setTitle("Info Commands")
        .setDescription(
            `**/membercount:** Gets the current amount of members.\n` +
            `**/userinfo (user):** Gets information about a user.\n` +
            `**/serverinfo:** Gets information about the server.\n` 
            )
        .setColor("Red")
        .setFooter({text:`Requested by ${interaction.user.tag}`}) 
        .setTimestamp()
        
        const embed4 = new Discord.EmbedBuilder()
        embed4
        .setTitle("Utility Commands")
        .setDescription(
            `**/debug:** Returns with bot stats.\n` +
            `**/ping:** Returns with the bots ping.`
        )
        .setColor("DarkOrange")
        .setFooter({text:`Requested by ${interaction.user.tag}`}) 
        .setTimestamp()

        const embed5 = new Discord.EmbedBuilder()
        embed5
        .setTitle("Moderation Commands")
        .setDescription(
            `**/ban (target) (reason) (force):** Ban a user from the server.\n` +
            `**/unban (target) (reason):** Unbans a user from the server..\n` +
            `**/kick (target) (reason):** Kick a user from the server.\n` +
            `**/mute (target) (duration) (reason):** Mutes a user.\n` +
            `**/warn (target) (reason):** Warns a user.\n` +
            `**/mod (user):** Moderate a users name.\n` +
            `**/nick (target) (nickname):** Change or reset a members nickname.\n` +
            `**/clear (amount):** Clear messages from a channel.\n` +
            `**/slowmode (time) (reason):** Sets a channels slowmode.`
        )
        .setColor("Orange")
        .setFooter({text:`Requested by ${interaction.user.tag}`}) 
        .setTimestamp()

        const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('sel')
                    .setPlaceholder('Choose a Category')
                    .addOptions([
                        {
                            label: "Misc. Commands",
                            value: "a",
                            emoji: "✨"
                        },
                        {
                            label: "Info Commands",
                            value: "b",
                            emoji: "❓"
                        },
                        {
                            label: "Utility Commands",
                            value: "c",
                            emoji: "🔧"
                        },
                        {
                            label: "Moderation Commands",
                            value: "d",
                            emoji: "🔨"
                        },
                        {
                            label: "Main Menu",
                            value: "e",
                            emoji: "🏡"
                        }
                    ])
            )
        try {
        const msg = await interaction.reply({ embeds: [embed], components: [row], ephemeral: true});
        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 15000 });
        collector.on('collect', interaction => {
            if(interaction.customId === "sel"){
                if(interaction.values[0] === 'a') {
                    interaction.update({ embeds: [embed2], ephemeral: true })
                } else if(interaction.values[0] === 'b') {
                    interaction.update({ embeds: [embed3], ephemeral: true })
                } else if(interaction.values[0] === 'c') {
                    interaction.update({ embeds: [embed4], ephemeral: true })
                } else if(interaction.values[0] === 'd') {
                    interaction.update({ embeds: [embed5], ephemeral: true })
                } else if(interaction.values[0] === 'e') {
                    interaction.update({ embeds: [embed], ephemeral: true })
                }
              }
        });

        //client.on('interactionCreate', interaction1 => {
        //    if (interaction1.isSelectMenu()){
        //      if(interaction1.customId === "sel"){
        //        if(interaction1.values[0] === 'a') {
        //            interaction.editReply({ embeds: [embed2], ephemeral: true })
        //        } else if(interaction1.values[0] === 'b') {
        //            interaction.editReply({ embeds: [embed3], ephemeral: true })
        //        } else if(interaction1.values[0] === 'c') {
        //            interaction.editReply({ embeds: [embed4], ephemeral: true })
        //        } else if(interaction1.values[0] === 'd') {
        //            interaction.editReply({ embeds: [embed5], ephemeral: true })
        //        }
        //      }
        //    }
        //  });
        } catch(error) {
            console.log(error)
			return interaction.reply("Errr... looks like something went wrong!");
        }
    },
};