/**
 * MKBOT Command: daily
 * @author Charles MK
 * Give users a daily coin reward.
 */

const DAILY_AMOUNT = 500;
const COOLDOWN_MS  = 24 * 60 * 60 * 1000; // 24 hours

const cooldowns = new Map();

module.exports = {
  config: {
    name: "daily",
    aliases: ["claim", "dailyreward"],
    version: "1.0",
    author: "Charles MK",
    role: 0,
    shortDescription: "Claim your daily coin reward",
    category: "economy",
    guide: "{pn}",
  },

  onStart: async function ({ message, event, usersData }) {
    const userID = event.senderID;
    const now    = Date.now();
    const last   = cooldowns.get(userID);

    if (last && now - last < COOLDOWN_MS) {
      const remaining = COOLDOWN_MS - (now - last);
      const hours     = Math.floor(remaining / 3600000);
      const minutes   = Math.floor((remaining % 3600000) / 60000);
      return message.reply(
        `⏰ You already claimed your daily reward!\n` +
        `Come back in ${hours}h ${minutes}m.`
      );
    }

    const user = await usersData.get(userID);
    await usersData.set(userID, { money: (user.money || 0) + DAILY_AMOUNT });
    cooldowns.set(userID, now);

    message.reply(
      `🎁 𝗗𝗔𝗜𝗟𝗬 𝗥𝗘𝗪𝗔𝗥𝗗\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `✅ You received ${DAILY_AMOUNT} coins!\n` +
      `💰 New Balance: ${((user.money || 0) + DAILY_AMOUNT).toLocaleString()} coins\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `⏰ Come back in 24 hours for more!`
    );
  },
};
