const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const nodeCache = require('node-cache');
const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.onText(/\/start/, msg => {
    const opts = {
        reply_to_message_id: msg.message_id,
        reply_markup: JSON.stringify({
            keyboard: [
                ['USD'],
                ['EUR']
            ]
        })
    };
    bot.sendMessage(msg.chat.id, 'Choose currency', opts);
});

bot.onText(/USD/, msg => {
    axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').then(res => {
        const result = {};
        res.data.forEach(e => {
            if(e.ccy == 'USD') {
                result["buy"] = e.buy;
                result["sale"] = e.sale;
            }
        });
        bot.sendMessage(msg.chat.id, JSON.stringify(result));
    });
});

bot.onText(/EUR/, msg => {
    axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11').then(res => {
        const result = {};
        res.data.forEach(e => {
            if(e.ccy == 'EUR') {
                result["buy"] = e.buy;
                result["sale"] = e.sale;
            }
        });
        bot.sendMessage(msg.chat.id, JSON.stringify(result));
    });
});