from telethon import TelegramClient, events
import asyncio

# =========================
# بيانات حسابك
# =========================
api_id = 31152734
api_hash = '2bee7bb099845646b325802524e098dc'

# =========================
# البوتات التي تريد مراقبتها
# بدون @
# =========================
BOTS = [
    'Almunharif13bot',
    'Almunharif14bot',
    'TricksMastarNumberFile2_bot'
]

# =========================
# أين يتم إرسال الرسائل
# me = الرسائل المحفوظة
# =========================
TARGET_ID = 'me'

# =========================
# إنشاء الجلسة
# =========================
client = TelegramClient(
    'multi_session',
    api_id,
    api_hash
)

# =========================
# استقبال الرسائل
# =========================
@client.on(events.NewMessage(from_users=BOTS))
async def handler(event):
    try:
        sender = await event.get_sender()

        username = (
            sender.username
            if sender.username
            else "unknown"
        )

        print(f"📩 رسالة جديدة من @{username}")

        # إرسال اسم البوت
        await client.send_message(
            TARGET_ID,
            f"📢 رسالة من @{username}"
        )

        # تحويل الرسالة
        await client.forward_messages(
            TARGET_ID,
            event.message
        )

        # حذف الرسالة من محادثتك
        # احذف السطر إذا لا تريد الحذف
        await event.delete()

    except Exception as e:
        print("❌ خطأ:", e)

# =========================
# تشغيل دائم
# =========================
async def main():
    while True:
        try:
            print("🚀 النظام يعمل الآن...")
            await client.start()
            await client.run_until_disconnected()

        except Exception as e:
            print("⚠️ انقطع الاتصال")
            print("🔄 إعادة المحاولة بعد 5 ثواني")
            await asyncio.sleep(5)

# =========================
# بدء التشغيل
# =========================
asyncio.run(main())