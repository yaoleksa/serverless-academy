const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['Forecast in Nice']
            ]
        })
    };
    bot.sendMessage(msg.chat.id, 'Hello!', opts);
});

bot.onText(/Forecast in Nice/, (msg) => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['at intervals of 3 hours'],
                ['at intervals of 6 hours']
            ]
        })
    };
    bot.sendMessage(msg.chat.id, 'Select interval', opts);
})