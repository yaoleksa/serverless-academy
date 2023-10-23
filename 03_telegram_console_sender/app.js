const { Command } = require('commander');
const TelegramBot = require('node-telegram-bot-api');
const program = new Command();
const Token = "6587401436:AAEcW-YleFJz8Dum4ufoBitiHMdczRhmlY0";
const bot = new TelegramBot(Token, {polling: true});
const chatId = "2024237143";

program.name('Text sender').description('Send text message to Telegram bot').version('0.0.0');
program.command('send-txt').description('Send entered text to Telegram bot').argument('<string>', 'text to send').action((input) => {
    bot.sendMessage(chatId, input);
    console.log(`Here we are: ${input}`);
});

program.parse();