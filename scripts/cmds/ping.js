/**
 * MKBOT Command: ping
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "ping",
    aliases: ["pong", "latency"],
    version: "1.0",
    author: "Charles MK",
    role: 0,
    shortDescription: "Check the bot's response time",
    category: "system",
    guide: "{pn}",
  },

  onStart: async function ({ message, event, api }) {
    const start = Date.now();
    await api.sendMessage("🏓 Pinging...", event.threadID);
    const latency = Date.now() - start;
    const uptime  = global.utils.formatUptime(Date.now() - global.GoatBot.startTime);
    message.reply(
      `🏓 𝗣𝗢𝗡𝗚!\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `⚡ Latency : ${latency}ms\n` +
      `⏱️  Uptime  : ${uptime}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `🤖 MKBOT by Charles MK`
    );
  },
};
