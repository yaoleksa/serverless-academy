const { Command } = require('commander');
const TelegramBot = require('node-telegram-bot-api');
const program = new Command();
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

program.name('./app.js').description('Send message to Telegram bot').version('0.0.0');
program.command('message').alias('m').description('Send entered text to Telegram bot').argument('<string>', 'text to send').action((input) => {
    bot.sendMessage(process.env.CHAT_ID, input);
    console.log(`Message ${input} was successfully sent`);
    setTimeout(() => {
        process.exit();
    }, 5000);
});
program.command('photo').alias('p').description('Send photo to Telegram bot').argument('<path-to-file>', 'path to photo').action((path) => {
    bot.sendPhoto(process.env.CHAT_ID, path);
    console.log('Photo successfully sent to Telegram');
    setTimeout(() => {
        process.exit();
    }, 10000);
});

program.parse();