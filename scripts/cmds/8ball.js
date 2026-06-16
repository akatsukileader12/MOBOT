/**
 * MKBOT Command: 8ball
 * @author Charles MK
 */

const ANSWERS = [
  "✅ It is certain.", "✅ It is decidedly so.", "✅ Without a doubt.",
  "✅ Yes definitely.", "✅ You may rely on it.", "✅ As I see it, yes.",
  "✅ Most likely.", "✅ Outlook good.", "✅ Yes.", "✅ Signs point to yes.",
  "🤷 Reply hazy, try again.", "🤷 Ask again later.", "🤷 Better not tell you now.",
  "🤷 Cannot predict now.", "🤷 Concentrate and ask again.",
  "❌ Don't count on it.", "❌ My reply is no.", "❌ My sources say no.",
  "❌ Outlook not so good.", "❌ Very doubtful.",
];

module.exports = {
  config: {
    name: "8ball",
    aliases: ["eightball", "magic8"],
    version: "1.0",
    author: "Charles MK",
    role: 0,
    shortDescription: "Ask the magic 8-ball a yes/no question",
    category: "fun",
    guide: "{pn} [yes/no question]",
  },

  onStart: async function ({ message, args }) {
    if (!args.length) {
      return message.reply("❌ Please ask a yes/no question!\nExample: /8ball Will I win today?");
    }

    const question = args.join(" ");
    const answer   = global.utils.random(ANSWERS);

    message.reply(
      `🎱 𝗠𝗔𝗚𝗜𝗖 𝟴-𝗕𝗔𝗟𝗟\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `❓ ${question}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `${answer}`
    );
  },
};
