/**
 * MKBOT Command: uptime
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "uptime",
    aliases: ["ut"],
    version: "1.0",
    author: "Charles MK",
    role: 0,
    shortDescription: "Show how long the bot has been running",
    category: "system",
    guide: "{pn}",
  },

  onStart: async function ({ message }) {
    const uptime = global.utils.formatUptime(Date.now() - global.GoatBot.startTime);
    const time   = global.utils.getTime();
    message.reply(
      `⏱️ 𝗨𝗣𝗧𝗜𝗠𝗘\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `🤖 MKBOT has been online for:\n` +
      `⚡ ${uptime}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `🕐 Current time: ${time}`
    );
  },
};
