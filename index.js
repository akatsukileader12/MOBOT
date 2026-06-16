/**
 * MKBOT - Facebook Messenger Bot
 * @author Charles MK
 * @version 1.0.0
 *
 * Entry point — spawns Bot.js and auto-restarts on crash (exit code 2).
 */

const { spawn } = require("child_process");
const path = require("path");

const log = require("./logger/log");

function startBot() {
  const child = spawn("node", [path.join(__dirname, "Bot.js")], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  child.on("close", (code) => {
    if (code === 2) {
      log.info("MKBOT", "Restarting bot...");
      setTimeout(startBot, 2000);
    } else {
      log.info("MKBOT", `Bot exited with code ${code}. Not restarting.`);
      process.exit(code || 0);
    }
  });

  child.on("error", (err) => {
    log.error("MKBOT", `Failed to start bot process: ${err.message}`);
    setTimeout(startBot, 5000);
  });
}

startBot();
