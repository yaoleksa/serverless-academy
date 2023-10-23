const { Command } = require('commander');
const TelegramBot = require('node-telegram-bot-api');
const program = new Command();
const Token = "MY_TELEGRAM_TOKEN";
//const bot = new TelegramBot(Token, {polling: true});
const chatId = "MY_TELEGRAM_BOT_CHAT_ID";

program.name('Text sender').description('Send text message to Telegram bot').version('0.0.0');
program.command('send-txt').description('Send entered text to Telegram bot').argument('<string>', 'text to send').action((input) => {
    //bot.sendMessage(chatId, input);
    console.log(`Here we are: ${input}`);
});

program.parse();