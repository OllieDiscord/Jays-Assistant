const { MessageEmbed } = require("discord.js");
const { EMBED_COLOUR } = require("../../db/data/DesignOptions.json");

module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
      if (member.user.bot) return;

      const WelcomeChannel = member.guild.channels.cache.get("929378716902117471");

      const WelcomeEmbed = new MessageEmbed()
      .setColor(EMBED_COLOUR)
      .setTitle(`👋 Welcome to ${member.guild.name} ${member.user.tag}`)
      .setThumbnail(`${member.guild.iconURL({ dynamic: true })}`)
      .setDescription(`Welcome to the server ${member.user}, make sure to read <#929387535434674207> and get some <#929677586236313630> enjoy your stay!`)
      .setFooter({ text: `Members Now: ${member.guild.memberCount}` });

      WelcomeChannel.send({ content: `${member.user} | <@&959451229501677649>`, embeds: [WelcomeEmbed] });
  });
};