/**
 * MKBOT Command: userinfo
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "userinfo",
    aliases: ["whoami", "profile"],
    version: "1.0",
    author: "Charles MK",
    role: 0,
    shortDescription: "Show info about a user",
    category: "info",
    guide: "{pn} — your info\n{pn} @mention — mentioned user's info",
  },

  onStart: async function ({ message, event, usersData }) {
    const mentions = Object.keys(event.mentions || {});
    const targetID = mentions[0] || event.senderID;

    try {
      const user = await usersData.get(targetID);
      const roleNames = ["User", "Mod", "Admin", "Premium", "Dev"];
      const roleName  = roleNames[user.role] || "User";

      const utils = global.utils;
      let computedRole = user.role;
      if (utils.isDev(targetID))     computedRole = 4;
      else if (utils.isAdmin(targetID)) computedRole = 2;
      else if (utils.isPremium(targetID)) computedRole = 3;

      message.reply(
        `👤 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🆔 User ID : ${targetID}\n` +
        `📛 Name    : ${user.name || "Unknown"}\n` +
        `🏷️  Role    : ${roleNames[computedRole] || "User"}\n` +
        `🔒 Banned  : ${user.banned ? "Yes ❌" : "No ✅"}\n` +
        `⭐ EXP     : ${user.exp || 0}\n` +
        `💰 Money   : ${user.money || 0}\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `🤖 MKBOT by Charles MK`
      );
    } catch (err) {
      message.reply(`❌ Could not get user info: ${err.message}`);
    }
  },
};
