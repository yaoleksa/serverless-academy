const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.onText(/\/start/, msg => {
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

bot.onText(/Forecast in Nice/, msg => {
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
});

bot.onText(/at intervals of 3 hours/, msg => {
    weatherForecastRequest(msg.chat.id);
    setInterval(weatherForecastRequest, 1000 * 60 * 180, msg.chat.id);
});

bot.onText(/at intervals of 6 hours/, msg => {
    weatherForecastRequest(msg.chat.id);
    setInterval(weatherForecastRequest, 1000 * 60 * 360, msg.chat.id);
})

function weatherForecastRequest(chatId) {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
            q: 'Lviv,ua',
            APPID: process.env.APPID
        }
    }).then(res => {
        bot.sendMessage(chatId, JSON.stringify(res.data.list[0]));
    });
}