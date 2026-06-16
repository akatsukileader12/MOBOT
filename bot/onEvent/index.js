/**
 * MKBOT – Group Event handler
 * @author Charles MK
 * Dispatches group events (joins, leaves, title changes, etc.)
 * to registered event modules.
 */

const log = require("../../logger/log");

module.exports = async function handleEvent({ api, event }) {
  const { eventCommands } = global.GoatBot;

  for (const [name, mod] of eventCommands) {
    if (!mod.onStart) continue;
    try {
      await mod.onStart({
        api,
        event,
        message: makeMessage(api, event),
        usersData:   global.db.usersData,
        threadsData: global.db.threadsData,
        globalData:  global.db.globalData,
      });
    } catch (e) {
      log.error("EVENT", `Event error [${name}]: ${e.message}`);
    }
  }
};

function makeMessage(api, event) {
  return {
    reply: (body, callback) =>
      api.sendMessage(body, event.threadID, callback, event.messageID),
    send: (body, threadID, callback) =>
      api.sendMessage(body, threadID || event.threadID, callback),
  };
}
