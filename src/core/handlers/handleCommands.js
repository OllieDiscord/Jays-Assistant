const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { readdirSync } = require("fs");
require("dotenv/config");

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

module.exports = (client) => {
    client.handleCommands = async () => {
        client.commandsArray = [];

        const commandFolders = readdirSync("./src/commands");
        for (const folder of commandFolders) {
            const commandFiles = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".js"));
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandsArray.push(command.data.toJSON());
            };
        };

        const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

        try {
            await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: client.commandsArray });
            console.log(`[REGISTERED] ${client.commands.size} command(s) registered.`);
        } catch (error) {
            console.log(error);
        }
    };
};