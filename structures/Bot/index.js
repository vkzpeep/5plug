const { tokens, channels, firebaseConfig } = require('../../config.json');
const getKeyByValue = require("../Functions/getKeyByValue");

const db = require('firebase/database');
require('firebase/app').initializeApp(firebaseConfig);

module.exports = (client) => {
    const tokens = [
    'MTI0MzU4MDEyODA4MDk1MzQwNw.Gw6XNu.2TMBkFTazZMR0d5OrqjFEnZG91kTQ3n5kQIarg'];
    const getToken = tokens[Math.floor(Math.random() * tokens.length)];
    const globalRef = (author) => db.ref(db.getDatabase(), author ?? '');
    const getDatabaseInfo = async (id) => (await db.get(globalRef(id)))?.val();

    client.on('ready', async () => console.log('[!] Cérebro ligado!'));

    client.on("messageCreate", async message => {
        const channelId = message.channel.id;
        if (!Object.values(channels).includes(channelId)) return;

        message.delete().catch(() => null);

        const allowedRole = message.guild.roles.cache.get('1244322367895900220');
        const authMembers = message.member.roles.cache.get(allowedRole.id);

        const channelName = getKeyByValue(channels, channelId);
        const messageContent = message.content;

        const databaseRef = await getDatabaseInfo('/') ?? {};
        const mapped = Object.keys(databaseRef).map(key => {
            return {
                id: key,
                lady: databaseRef[key]?.lady,
                clip: databaseRef[key]?.clip,
                instagram: databaseRef[key]?.instagram,
                emoji: databaseRef[key]?.emoji,
                link: databaseRef[key]?.link
            }
        });
        const links = mapped.map(key => key.link);

        if (!authMembers) return;
        if (channelId === channels.link && links.includes(messageContent)) return console.log('já existe!');

        if (['remover', 'remove'].includes(messageContent))
            return await db.update(globalRef(message.author.id), {
                [channelName]: null
            });

        await db.update(globalRef(message.author.id), {
            [channelName]: messageContent
        });
    });

    client.login(getToken);
}