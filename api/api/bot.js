const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const SECRET_KEY = "8613169391:AAFXA_hxnR_7-0Iy-XJH55iW05AfnQpM0Rw"; 

bot.start((ctx) => {
    const payload = ctx.startPayload;
    if (payload === SECRET_KEY) {
        const employeeId = ctx.chat.id;
        ctx.reply(تم اعتمادك بنجاح.\nمعرفك: ${employeeId}\n\nاختر القسم لتوليد الرابط:, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "القسم الأول", callback_data: service_1_${employeeId} }],
                    [{ text: "القسم الثاني", callback_data: service_2_${employeeId} }]
                ]
            }
        });
    } else {
        ctx.reply("عذراً، الدخول للمخولين فقط عبر الرابط المفتاح.");
    }
});

bot.on('callback_query', (ctx) => {
    const data = ctx.callbackQuery.data.split('_');
    const serviceNum = data[1];
    const empId = data[2];
    const personalLink = https://${process.env.VERCEL_URL}?chatId=${empId}&service=${serviceNum};
    ctx.reply(إليك رابطك الشخصي للقسم ${serviceNum}:\n\n${personalLink});
});

module.exports = async (req, res) => {
    try { await bot.handleUpdate(req.body); res.status(200).send('OK'); }
    catch (err) { res.status(500).send('Error'); }
};
