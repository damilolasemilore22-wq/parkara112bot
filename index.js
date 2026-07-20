require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('❌ BOT_TOKEN is missing. Set it in your environment variables.');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log('✅ parkara112bot is running...');

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    `👋 Welcome to parkara112bot!\n\n` +
    `Available commands:\n` +
    `/help - Show this menu\n` +
    `/echo <text> - Echo your message back`
  );
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    `Here's what I can do:\n\n` +
    `/start - Welcome message\n` +
    `/echo <text> - Repeats what you type`
  );
});

// /echo command
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  bot.sendMessage(chatId, text);
});

// Catch-all for plain messages
bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  }
});

// Basic error handling
bot.on('polling_error', (err) => {
  console.error('Polling error:', err.message);
});
