/**
 * MKBOT Command: coin
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "coin",
    aliases: ["flip", "coinflip"],
    version: "1.0",
    author: "Charles MK",
    role: 0,
    shortDescription: "Flip a coin",
    category: "fun",
    guide: "{pn}",
  },

  onStart: async function ({ message }) {
    const result = Math.random() < 0.5 ? "🟡 Heads" : "⚪ Tails";
    message.reply(`🪙 Coin Flip Result: ${result}`);
  },
};
