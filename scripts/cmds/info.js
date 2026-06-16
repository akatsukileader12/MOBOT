/**
 * MKBOT Command: info
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "info",
    aliases: ["botinfo", "about"],
    version: "1.0",
    author: "Charles MK",
    role: 0,
    shortDescription: "Show info about MKBOT",
    category: "system",
    guide: "{pn}",
  },

  onStart: async function ({ message }) {
    const { commands, eventCommands, config, startTime } = global.GoatBot;
    const uptime = global.utils.formatUptime(Date.now() - startTime);
    const mem    = process.memoryUsage();
    const toMB   = (b) => (b / 1024 / 1024).toFixed(1);
    const nodeVer = process.version;

    message.reply(
      `🤖 𝗠𝗢𝗕𝗢𝗧 𝗜𝗡𝗙𝗢\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `👤 Bot Name   : MKBOT\n` +
      `✍️  Author     : Charles MK\n` +
      `🔖 Version    : v1.0.0\n` +
      `📌 Prefix     : "${config.prefix}"\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `⚙️  Commands   : ${commands.size}\n` +
      `📅 Events     : ${eventCommands.size}\n` +
      `⏱️  Uptime     : ${uptime}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `💾 Heap Used  : ${toMB(mem.heapUsed)} MB\n` +
      `💾 Heap Total : ${toMB(mem.heapTotal)} MB\n` +
      `🟢 Node.js    : ${nodeVer}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `🛠️ Powered by fca-unofficial`
    );
  },
};
