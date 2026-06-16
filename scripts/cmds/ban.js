/**
 * MKBOT Command: ban
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "ban",
    aliases: ["block"],
    version: "1.0",
    author: "Charles MK",
    role: 2,
    shortDescription: "Ban a user from using the bot",
    category: "admin",
    guide: "{pn} [userID or @mention] [reason?]",
  },

  onStart: async function ({ message, args, event, usersData }) {
    const mentions = Object.keys(event.mentions || {});
    const targetID = mentions[0] || args[0];

    if (!targetID) {
      return message.reply("❌ Please specify a user to ban. Use @mention or their user ID.");
    }

    if (global.utils.isAdmin(targetID) || global.utils.isDev(targetID)) {
      return message.reply("⛔ You cannot ban an admin or developer.");
    }

    const reason = args.slice(mentions.length ? 1 : 1).join(" ") || "No reason provided";

    await usersData.set(targetID, { banned: true, banReason: reason });

    message.reply(
      `🔨 𝗨𝗦𝗘𝗥 𝗕𝗔𝗡𝗡𝗘𝗗\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `👤 User ID : ${targetID}\n` +
      `📝 Reason  : ${reason}\n` +
      `🛡️ Banned by: Admin`
    );
  },
};
