const { Client, Collection, Partials, GatewayIntentBits } = require('discord.js');
const config = require('./Config/config.json');
const handler = require("./handler/index");
const handlerError = require("./handler/AntiCrash");
const updateApplicationStatus = require('./handler/status');

const myIntents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildWebhooks,
  GatewayIntentBits.GuildInvites,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.DirectMessageTyping,
  GatewayIntentBits.MessageContent
];

const myPartials = [
  Partials.Channel,
  Partials.Message,
  Partials.Reaction
];
const client = new Client({
  partials: myPartials,
  intents: myIntents
});

client.discord = require('discord.js');
client.commands = new Collection();
client.slash = new Collection();

handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

handlerError.antiCrash(client);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  updateApplicationStatus(client);
});

client.login(config.Bot_Token);
