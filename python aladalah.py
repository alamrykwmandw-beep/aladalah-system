from telethon import TelegramClient, events
import asyncio

# =========================
# بيانات حسابك
# =========================
api_id = 31152734
api_hash = '2bee7bb099845646b325802524e098dc'

# =========================
# البوتات
# =========================
BOTS = [
    'Almunharif13bot',
    'Almunharif14bot',
    'TricksMastarNumberFile2_bot'
]

# =========================
# وجهة الرسائل
# =========================
TARGET_ID = 'me'

client = TelegramClient('multi_session', api_id, api_hash)

@client.on(events.NewMessage(chats=BOTS))
async def handler(event):
    try:
        msg = event.message
        text = msg.message or ""

        # إرسال الرسالة لك
        if msg.media:
            await client.send_file(
                TARGET_ID,
                msg.media,
                caption=text if text else None
            )
        else:
            await client.send_message(TARGET_ID, text)

        # حذف الرسالة الأصلية بعد نسخها
        try:
            await msg.delete()
        except:
            print("⚠️ لا يمكن حذف هذه الرسالة (صلاحيات أو بوت يمنع الحذف)")

    except Exception as e:
        print("❌ خطأ:", e)


async def main():
    print("🚀 تشغيل النظام...")
    await client.start()
    print("✅ تم التشغيل بنجاح")
    await client.run_until_disconnected()

asyncio.run(main())
