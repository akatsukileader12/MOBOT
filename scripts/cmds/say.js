/**
 * MKBOT Command: say
 * @author Charles MK
 * Makes the bot send a message.
 */

module.exports = {
  config: {
    name: "say",
    aliases: ["echo", "speak"],
    version: "1.0",
    author: "Charles MK",
    role: 1,
    shortDescription: "Make the bot say something",
    category: "fun",
    guide: "{pn} [message]",
  },

  onStart: async function ({ message, args }) {
    if (!args.length) {
      return message.reply("❌ Please provide a message for me to say.");
    }
    message.reply(args.join(" "));
  },
};
