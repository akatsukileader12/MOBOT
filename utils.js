/**
 * MKBOT Utilities
 * @author Charles MK
 */

const fs = require("fs-extra");
const path = require("path");
const moment = require("moment-timezone");

const config = (() => {
  try { return require("./config.json"); }
  catch { return {}; }
})();

const utils = {
  /* ─── Time ─────────────────────────────────────────────── */
  getTime(format = "DD/MM/YYYY HH:mm:ss", tz) {
    return moment().tz(tz || config.timeZone || "Africa/Johannesburg").format(format);
  },

  /* ─── Uptime ─────────────────────────────────────────────*/
  formatUptime(ms) {
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const parts = [];
    if (d) parts.push(`${d}d`);
    if (h) parts.push(`${h}h`);
    if (m) parts.push(`${m}m`);
    parts.push(`${sec}s`);
    return parts.join(" ");
  },

  /* ─── String helpers ────────────────────────────────────── */
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  truncate(str, len = 100) {
    return str.length > len ? str.slice(0, len) + "…" : str;
  },

  /* ─── File helpers ──────────────────────────────────────── */
  readJSON(filePath) {
    try {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      return null;
    }
  },

  writeJSON(filePath, data) {
    fs.ensureDirSync(path.dirname(filePath));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  },

  /* ─── Permission helpers ────────────────────────────────── */
  isAdmin(userID) {
    const adminList = (config.adminBot || []).map(String);
    return adminList.includes(String(userID));
  },

  isDev(userID) {
    const devList = (config.devUsers || []).map(String);
    return devList.includes(String(userID));
  },

  isPremium(userID) {
    const premList = (config.premiumUsers || []).map(String);
    return premList.includes(String(userID));
  },

  /* ─── Sleep ─────────────────────────────────────────────── */
  sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  },

  /* ─── Random ─────────────────────────────────────────────- */
  random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

module.exports = utils;
