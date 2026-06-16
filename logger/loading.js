/**
 * MKBOT Loading Spinner
 * @author Charles MK
 */

const ora = require("ora");
const chalk = require("chalk");

class Loading {
  constructor(text = "Loading...") {
    this.spinner = ora({
      text: chalk.cyan(text),
      spinner: "dots",
      color: "cyan",
    });
  }

  start(text) {
    if (text) this.spinner.text = chalk.cyan(text);
    this.spinner.start();
    return this;
  }

  success(text) {
    this.spinner.succeed(chalk.green(text || "Done!"));
    return this;
  }

  fail(text) {
    this.spinner.fail(chalk.red(text || "Failed!"));
    return this;
  }

  warn(text) {
    this.spinner.warn(chalk.yellow(text || "Warning!"));
    return this;
  }

  stop() {
    this.spinner.stop();
    return this;
  }
}

module.exports = Loading;
