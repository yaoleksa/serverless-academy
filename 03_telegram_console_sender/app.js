const { Command } = require('commander');
const TelegramBot = require('node-telegram-bot-api');
const program = new Command();
const Token = "6587401436:AAEcW-YleFJz8Dum4ufoBitiHMdczRhmlY0";
const bot = new TelegramBot(Token, {polling: true});
const chatId = "2024237143";

program.name('./app.js').description('Send message to Telegram bot').version('0.0.0');
program.command('message').description('Send entered text to Telegram bot').argument('<string>', 'text to send').action((input) => {
    bot.sendMessage(chatId, input);
    console.log(`Message ${input} was successfully sent`);
});
program.command('m').description('Send entered text to Telegram bot').argument('<string>', 'text to send').action((input) => {
    bot.sendMessage(chatId, input);
    console.log(`Message ${input} was successfully sent`);
});
//program

program.parse();