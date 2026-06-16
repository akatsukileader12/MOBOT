/**
 * MKBOT Command: unban
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "unban",
    aliases: ["unblock"],
    version: "1.0",
    author: "Charles MK",
    role: 2,
    shortDescription: "Unban a user",
    category: "admin",
    guide: "{pn} [userID]",
  },

  onStart: async function ({ message, args, event, usersData }) {
    const mentions = Object.keys(event.mentions || {});
    const targetID = mentions[0] || args[0];

    if (!targetID) {
      return message.reply("❌ Please specify a user ID to unban.");
    }

    await usersData.set(targetID, { banned: false, banReason: "" });

    message.reply(
      `✅ 𝗨𝗦𝗘𝗥 𝗨𝗡𝗕𝗔𝗡𝗡𝗘𝗗\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `👤 User ID : ${targetID}\n` +
      `🔓 User can now use the bot again.`
    );
  },
};
