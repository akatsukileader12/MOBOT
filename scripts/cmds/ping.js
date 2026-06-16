/**
 * MKBOT Command: ping
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "ping",
    aliases: ["pong", "latency"],
    version: "1.1",
    author: "Charles MK",
    role: 0,
    shortDescription: "Check the bot's response time",
    category: "system",
    guide: "{pn}",
  },

  onStart: async function ({ message, event, api }) {
    const start = Date.now();
    const uptime = global.utils.formatUptime(Date.now() - global.GoatBot.startTime);

    return new Promise((resolve) => {
      api.sendMessage("🏓 Pinging...", event.threadID, (err, info) => {
        const latency = Date.now() - start;
        if (err) return resolve();
        api.sendMessage(
          `🏓 𝗣𝗢𝗡𝗚!\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `⚡ Latency : ${latency}ms\n` +
          `⏱️  Uptime  : ${uptime}\n` +
          `━━━━━━━━━━━━━━━━━━\n` +
          `🤖 MKBOT by Charles MK`,
          event.threadID,
          () => resolve()
        );
      });
    });
  },
};
