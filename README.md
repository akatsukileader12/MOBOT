# MKBOT 🤖

**A Facebook Messenger Bot by Charles MK**

MKBOT is a clean, feature-rich Facebook Messenger bot built for group chats. It uses your Facebook account's cookies to connect (no official API key needed), stores data in MongoDB, and comes with 20+ ready-to-use commands across multiple categories.

---

## ✨ Features

- 🤖 **AI Chat** — Ask any question with `/ai`
- 💰 **Economy System** — Coins, daily rewards, wallet, transfers
- ⚙️ **Group Management** — Kick, add, ban, anti-leave
- 🛠️ **Utility Tools** — Weather, calculator, time, quotes
- 🎮 **Fun Commands** — Coin flip, dice roll, 8-ball, echo
- 📊 **System Commands** — Help, ping, uptime, bot info, restart
- 🔒 **Role-Based Permissions** — User / Mod / Admin / Premium / Dev
- 💾 **MongoDB Persistence** — All user and thread data is saved
- 🔄 **Auto-Restart** — Automatically recovers from crashes
- 📌 **Per-Group Prefix** — Each group can have its own prefix

---

## 📁 Project Structure

```
MKBOT/
├── index.js              ← Entry point (spawns Bot.js, handles restarts)
├── Bot.js                ← Main bot process (globals, DB, login, listen)
├── config.json           ← Your configuration (fill in your details!)
├── configCommands.json   ← Per-command overrides and banned commands
├── account.txt           ← Your Facebook cookies (fill in!)
├── package.json
├── logger/               ← Colored console logger
├── utils.js              ← Shared utilities
├── database/models/      ← Mongoose models (Thread, User, Global)
├── bot/
│   ├── login/            ← Facebook login + database loader
│   ├── handleListening.js← Main FCA listen loop
│   ├── onChat/           ← Message dispatcher (prefix + commands)
│   ├── onEvent/          ← Group event dispatcher
│   └── utils/            ← Command/event file loader
└── scripts/
    ├── cmds/             ← All command files (add your own here!)
    └── events/           ← All event files
```

---

## 🚀 Setup Guide

### Step 1 — Fill in `config.json`

Open `config.json` and replace the placeholder values:

```json
{
  "prefix": "/",
  "adminBot": ["YOUR_FACEBOOK_ID_HERE"],
  "premiumUsers": ["YOUR_FACEBOOK_ID_HERE"],
  "devUsers": ["YOUR_FACEBOOK_ID_HERE"],
  "database": {
    "uriMongodb": "YOUR_MONGODB_URI_HERE"
  }
}
```

- **prefix** — The symbol used to trigger commands (default: `/`)
- **adminBot / devUsers** — Your own Facebook ID (find it at [findmyfbid.in](https://findmyfbid.in))
- **uriMongodb** — Your MongoDB Atlas connection string

### Step 2 — Add your Facebook cookies to `account.txt`

Replace `account.txt` with your real Facebook cookies in JSON format.

**How to get cookies:**
1. Log into Facebook in your browser
2. Install the extension **"EditThisCookie"** or **"Cookie-Editor"**
3. Export all cookies as JSON
4. Paste the JSON array into `account.txt`

> ⚠️ **Warning:** Never share your cookies with anyone. They grant full access to your Facebook account.

### Step 3 — Install dependencies

```bash
npm install
```

### Step 4 — Start the bot

```bash
npm start
```

You should see the MKBOT banner and "Bot is live!" in your terminal.

---

## 📝 Command List

| Command | Aliases | Role | Description |
|---------|---------|------|-------------|
| `/help` | menu, commands | User | Show all commands |
| `/ping` | pong | User | Check bot latency |
| `/info` | botinfo, about | User | Bot information |
| `/uptime` | ut | User | How long bot has been running |
| `/time` | date, clock | User | Current time |
| `/prefix [new]` | setprefix | Mod | Change group prefix |
| `/ai [question]` | ask, gpt | User | Ask the AI |
| `/weather [city]` | wthr | User | Get weather info |
| `/calc [expr]` | math | User | Calculate math |
| `/quote` | inspire | User | Random quote |
| `/8ball [question]` | magic8 | User | Magic 8-ball |
| `/coin` | flip | User | Coin flip |
| `/roll [sides]` | dice | User | Roll a dice |
| `/say [text]` | echo | Mod | Bot says something |
| `/balance` | bal, wallet | User | Check coin balance |
| `/daily` | claim | User | Claim daily reward |
| `/givemoney @user [amt]` | transfer | User | Send coins to a user |
| `/userinfo` | profile | User | View user profile |
| `/groupinfo` | gcinfo | User | View group info |
| `/ban @user` | block | Admin | Ban a user |
| `/unban @user` | unblock | Admin | Unban a user |
| `/kick @user` | remove | Mod | Kick a user from group |
| `/add [userID]` | invite | Mod | Add a user to the group |
| `/antiout on\|off` | antiLeave | Mod | Toggle anti-leave |
| `/restart` | reboot | Admin | Restart the bot |
| `/stop` | shutdown | Dev | Shut down the bot |

---

## ➕ Adding New Commands

Create a new `.js` file in `scripts/cmds/`:

```js
module.exports = {
  config: {
    name: "hello",
    aliases: ["hi"],
    version: "1.0",
    author: "Charles MK",
    role: 0,             // 0=User, 1=Mod, 2=Admin, 3=Premium, 4=Dev
    shortDescription: "Say hello",
    category: "fun",
    guide: "{pn} — greet the bot",
  },

  onStart: async function ({ message, event }) {
    message.reply("Hello! I'm MKBOT 🤖");
  },
};
```

The bot auto-loads all `.js` files in `scripts/cmds/` on startup. No registration needed.

---

## 🌐 Running on a Server (24/7)

Use **PM2** to keep the bot running in the background:

```bash
npm install -g pm2
pm2 start index.js --name mkbot
pm2 save
pm2 startup
```

Or deploy to **Render.com** (free tier):
1. Push to GitHub
2. Create a new Web Service on Render
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Add your environment variables (or use `config.json` directly)

---

## ⚙️ Configuration Reference

| Key | Description |
|-----|-------------|
| `prefix` | Default command prefix |
| `adminBot` | Array of admin Facebook IDs |
| `devUsers` | Array of developer Facebook IDs (full access) |
| `premiumUsers` | Array of premium user IDs |
| `database.uriMongodb` | MongoDB Atlas connection URI |
| `timeZone` | Your timezone (e.g. `Africa/Johannesburg`) |
| `antiInbox` | If `true`, bot ignores private/inbox messages |
| `adminOnly.enable` | If `true`, only admins can use commands |
| `spamProtection.enable` | Auto-block command flooding |
| `autoRestart.time` | Cron expression for scheduled restarts |

---

## 📄 License

MIT — Made with ❤️ by **Charles MK**
