/**
 * MKBOT Command: prefix
 * @author Charles MK
 * Admins can set a per-thread prefix.
 */

module.exports = {
  config: {
    name: "prefix",
    aliases: ["setprefix"],
    version: "1.0",
    author: "Charles MK",
    role: 1,
    shortDescription: "Set or view the bot prefix for this thread",
    category: "config",
    guide: "{pn} — view prefix\n{pn} [new prefix] — set a new prefix",
  },

  onStart: async function ({ message, args, prefix, event, threadsData }) {
    if (!args[0]) {
      return message.reply(
        `📌 Current prefix for this chat: "${prefix}"\n` +
        `💡 Use ${prefix}prefix [new prefix] to change it.`
      );
    }

    const newPrefix = args[0].trim();
    if (newPrefix.length > 5) {
      return message.reply("❌ Prefix must be 5 characters or less.");
    }

    await threadsData.set(event.threadID, { prefix: newPrefix });
    message.reply(`✅ Prefix updated to "${newPrefix}" for this chat.`);
  },
};
