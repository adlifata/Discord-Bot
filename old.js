const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const { Client, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// =======================
//  == Building command ==
// =======================
const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info!"),
  new SlashCommandBuilder()
    .setName("aboutme")
    .setDescription("Replies with user info!"),
].map((command) => command.toJSON());

// =======================
//  == set rest         ==
// =======================
const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);
rest
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

// =======================
//  == Listener         ==
// =======================
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  //   if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  console.log("Command Name: ", commandName);

  if (commandName === "ping") {
    await interaction.reply("ARIC BABAW");
  } else if (commandName === "server") {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === "aboutme") {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nYour status: JOMBLO GOBLOK`);
  }
});

client.login(process.env.BOT_TOKEN);
