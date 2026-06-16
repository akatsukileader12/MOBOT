/**
 * MKBOT Event: welcome
 * Sends a welcome message when a new member joins.
 * @author Charles MK
 */

module.exports = {
  config: {
    name: "welcome",
    version: "1.0",
    author: "Charles MK",
    description: "Welcome new members to the group",
  },

  onStart: async function ({ api, event, threadsData }) {
    if (event.type !== "event") return;
    if (event.logMessageType !== "log:subscribe") return;

    const addedIDs = event.logMessageData?.addedParticipants;
    if (!addedIDs || addedIDs.length === 0) return;

    /* Check if welcome is enabled for this thread */
    let thread;
    try { thread = await threadsData.get(event.threadID); } catch { return; }
    if (thread?.settings?.welcome === false) return;

    const botID = global.GoatBot.botID;

    for (const participant of addedIDs) {
      if (participant.userFbId === botID) {
        api.sendMessage(
          `👋 Hello everyone! I'm MKBOT, a Messenger bot by Charles MK.\n\n` +
          `Use "${global.GoatBot.config.prefix}help" to see all available commands.`,
          event.threadID
        );
      } else {
        api.sendMessage(
          `🎉 Welcome to the group, ${participant.fullName}!\n` +
          `We hope you enjoy your time here. 🤝`,
          event.threadID
        );
      }
    }
  },
};
