/**
 * MKBOT Command: add
 * @author Charles MK
 * Adds a user to the current group by their Facebook ID.
 */

module.exports = {
  config: {
    name: "add",
    aliases: ["adduser", "invite"],
    version: "1.0",
    author: "Charles MK",
    role: 1,
    shortDescription: "Add a user to the group by their Facebook ID",
    category: "group",
    guide: "{pn} [userID]",
  },

  onStart: async function ({ message, args, event, api }) {
    const targetID = args[0];

    if (!targetID || isNaN(targetID)) {
      return message.reply("❌ Please provide a valid Facebook user ID.\nExample: /add 100083039411474");
    }

    try {
      await api.addUserToGroup(targetID, event.threadID);
      message.reply(`✅ Successfully added user ${targetID} to the group!`);
    } catch (err) {
      message.reply(`❌ Failed to add user: ${err.message}`);
    }
  },
};
