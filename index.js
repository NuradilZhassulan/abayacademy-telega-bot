const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '6178900299:AAFOpdAPmwAsilCdcxZqA-cOZB0RDFF41vo';
// const webAppUrl = 'https://main--kaleidoscopic-blini-1e1356.netlify.app/';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        
        // await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
        //     reply_markup: {
        //         keyboard: [
        //             [{text: 'Заполнить форму', web_app: {url: webAppUrl + 'form'}}]
        //         ]
        //     }
        // })

        // await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
        //     reply_markup: {
        //         inline_keyboard: [
        //             [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
        //         ]
        //     }
        // })
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            await bot.sendMessage(chatId, '💪')
            await bot.sendMessage(chatId, 'Имя: ' + data?.country);
            await bot.sendMessage(chatId, 'Класс: ' + data?.street);
            await bot.sendMessage(chatId, 'Цены: ' + data?.street);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }
});

app.post('/web-data', async (req, res) => {
    const {queryId, nameStudent, classStudent, amount} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная отправка',
            input_message_content: {
                message_text: ` 👍, ученик ${nameStudent} добавлен }`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))