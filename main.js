const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth() // Ensures session persistence
});

const group_id = "120363387793668786@g.us"; // Replace with your actual group ID

client.on('qr', qr => {
    console.log('Scan this QR code with WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Client is ready!');
});

client.on('message_create', async message => {
    if (message.from === group_id) { // Check if the message is from the specific group
        console.log(`📩 Message from me: ${message.fromMe} ${message.from}`);
        console.log(`📩 Message from Group: ${message.body} ${message.author}`);

        if (message.body.toLowerCase().includes('cocó')) {
            await message.reply('Cocó guardado!');
        }
    }
});

client.initialize();
