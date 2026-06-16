/**
 * MKBOT – Main listener
 * @author Charles MK
 * Wires up the FCA listen loop and routes every event to the right handler.
 */

const log         = require("../logger/log");
const handleChat  = require("./onChat");
const handleEvent = require("./onEvent");

const SPAM_WINDOW  = {}; // senderID → { count, firstAt }

function isSpamming(senderID, threadID) {
  const cfg  = global.GoatBot.config?.spamProtection;
  if (!cfg?.enable) return false;

  // Admins and devs are never spam-blocked
  const utils = global.utils;
  if (utils.isAdmin(senderID) || utils.isDev(senderID)) return false;

  const threshold = cfg.commandThreshold || 5;
  const windowMs  = (cfg.timeWindow || 10) * 1000;
  const now       = Date.now();
  const key       = `${senderID}_${threadID}`;
  const record    = SPAM_WINDOW[key];

  if (!record || now - record.firstAt > windowMs) {
    SPAM_WINDOW[key] = { count: 1, firstAt: now };
    return false;
  }

  record.count++;
  if (record.count > threshold) {
    log.warn("SPAM", `Blocked senderID: ${senderID} in thread: ${threadID} (${record.count} msgs)`);
    return true;
  }
  return false;
}

module.exports = async function startListening(api) {
  global.GoatBot.fcaApi = api;
  global.GoatBot.botID  = api.getCurrentUserID();

  log.info("LISTEN", "Starting listenMqtt setup...");

  try {
    const msgEmitter = await api.listenMqtt(async (err, event) => {
      if (err) {
        const msg = err?.message || err?.error || JSON.stringify(err);
        log.error("LISTEN", `Callback error: ${msg}`);
        return;
      }

      log.info("LISTEN", `Event received — type: ${event?.type} | threadID: ${event?.threadID} | senderID: ${event?.senderID} | body: ${JSON.stringify(event?.body || "").slice(0, 80)}`);

      try {
        if (event.type === "message" || event.type === "message_reply") {
          if (isSpamming(event.senderID, event.threadID)) return;
          await handleChat({ api, event });
        } else {
          await handleEvent({ api, event });
        }
      } catch (e) {
        log.error("LISTEN", `Unhandled error: ${e.message}\n${e.stack}`);
      }
    });

    global.GoatBot.Listening = msgEmitter;
    log.success("LISTEN", "listenMqtt setup complete — waiting for events.");

    if (msgEmitter && typeof msgEmitter.on === "function") {
      msgEmitter.on("error", (err) => {
        const msg = err?.message || err?.error || JSON.stringify(err);
        log.error("LISTEN", `Emitter error: ${msg}`);
      });
    }
  } catch (e) {
    log.error("LISTEN", `listenMqtt threw: ${e.message}\n${e.stack}`);
  }
};
