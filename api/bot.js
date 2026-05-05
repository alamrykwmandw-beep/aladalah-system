const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
// المفتاح هنا هو التوكن نفسه كما أراد سياف
const SECRET_KEY = "8659596599:AAG5qK14sDzx-tCfj2CL4k0rKsrkBSaGZHg"; 

bot.start((ctx) => {
    const payload = ctx.startPayload;
    if (payload === SECRET_KEY) {
        const employeeId = ctx.chat.id;
        // تم إضافة علامة  في بداية ونهاية النص ليعمل بشكل صحيح
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
    if (data[0] === 'service') {
        const serviceNum = data[1];
        const empId = data[2];
        // تم إضافة علامات الاقتباس المائلة  لكي يدمج الرابط مع المتغيرات
        const personalLink = https://${process.env.VERCEL_URL}?chatId=${empId}&service=${serviceNum};
        ctx.reply(إليك رابطك الشخصي للقسم ${serviceNum}:\n\n${personalLink});
    }
});

module.exports = async (req, res) => {
    try { 
        await bot.handleUpdate(req.body); 
        res.status(200).send('OK'); 
    } catch (err) { 
        console.error(err);
        res.status(500).send('Error'); 
    }
};
