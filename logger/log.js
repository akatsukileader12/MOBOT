/**
 * MKBOT Logger
 * @author Charles MK
 */

const chalk = require("chalk");
const moment = require("moment-timezone");

const config = (() => {
  try { return require("../config.json"); }
  catch { return { timeZone: "Africa/Johannesburg" }; }
})();

const timeZone = config.timeZone || "Africa/Johannesburg";

const getTime = () => moment().tz(timeZone).format("DD/MM/YYYY HH:mm:ss");

const levels = {
  INFO:    { color: chalk.cyan.bold,    label: "INFO " },
  SUCCESS: { color: chalk.green.bold,   label: "DONE " },
  WARN:    { color: chalk.yellow.bold,  label: "WARN " },
  ERROR:   { color: chalk.red.bold,     label: "ERR  " },
  LOADER:  { color: chalk.magenta.bold, label: "LOAD " },
};

function print(level, tag, message) {
  const { color, label } = levels[level] || levels.INFO;
  const time = chalk.gray(`[${getTime()}]`);
  const lbl  = color(`[${label}]`);
  const t    = chalk.white.bold(`[${tag}]`);
  const msg  = typeof message === "object"
    ? JSON.stringify(message, null, 2)
    : String(message);
  console.log(`${time} ${lbl} ${t} ${msg}`);
}

module.exports = {
  info:    (tag, msg) => print("INFO",    tag, msg),
  success: (tag, msg) => print("SUCCESS", tag, msg),
  warn:    (tag, msg) => print("WARN",    tag, msg),
  error:   (tag, msg) => print("ERROR",   tag, msg),
  loader:  (tag, msg) => print("LOADER",  tag, msg),
};
