console.clear();

const { Client, Collection } = require("discord.js");
const { GatewayIntentBits } = require("discord-api-types/v10");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
require("dotenv/config");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildBans, 
        GatewayIntentBits.GuildPresences, 
        GatewayIntentBits.DirectMessages
    ],
    allowedMentions: { parse: ["users", "roles"] },
});

client.commands = new Collection();

const handlerFiles = readdirSync("./src/core/handlers/").filter(file => file.endsWith(".js"));
for (const file of handlerFiles) require(`../src/core/handlers/${file}`)(client);

const systemFolders = readdirSync("./src/core/systems/")
for (const folder of systemFolders) {
    const systemFiles = readdirSync(`./src/core/systems/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of systemFiles) require(`../src/core/systems/${folder}/${file}`)(client);
};

client.handleCommands();
client.handleEvents();
client.login(process.env.BOT_TOKEN).then(() => {
    mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log("[DATABASE] Connected to MongoDB."));
});