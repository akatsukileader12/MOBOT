/**
 * MKBOT Command: givemoney
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "givemoney",
    aliases: ["give", "transfer"],
    version: "1.0",
    author: "Charles MK",
    role: 0,
    shortDescription: "Give coins to another user",
    category: "economy",
    guide: "{pn} @mention [amount]",
  },

  onStart: async function ({ message, args, event, usersData }) {
    const mentions  = Object.keys(event.mentions || {});
    const targetID  = mentions[0];
    const amount    = parseInt(args[mentions.length ? 1 : 0]) || 0;

    if (!targetID) return message.reply("❌ Please @mention the user you want to send coins to.");
    if (targetID === event.senderID) return message.reply("❌ You can't give coins to yourself!");
    if (amount < 1) return message.reply("❌ Please enter a valid amount (minimum 1).");

    const sender   = await usersData.get(event.senderID);
    const senderBal = sender.money || 0;

    if (senderBal < amount) {
      return message.reply(`❌ Insufficient coins. Your balance: ${senderBal.toLocaleString()}`);
    }

    const receiver = await usersData.get(targetID);
    await usersData.set(event.senderID, { money: senderBal - amount });
    await usersData.set(targetID, { money: (receiver.money || 0) + amount });

    message.reply(
      `💸 𝗧𝗥𝗔𝗡𝗦𝗙𝗘𝗥 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `✅ Sent ${amount.toLocaleString()} coins to ${receiver.name || targetID}\n` +
      `💰 Your new balance: ${(senderBal - amount).toLocaleString()}`
    );
  },
};
