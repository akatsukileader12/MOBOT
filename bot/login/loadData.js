/**
 * MKBOT – Database loader
 * @author Charles MK
 * Connects to MongoDB and attaches model helpers to global.db.
 */

const mongoose = require("mongoose");
const log      = require("../../logger/log");
const Loading  = require("../../logger/loading");

const ThreadModel = require("../../database/models/threadModel");
const UserModel   = require("../../database/models/userModel");
const GlobalModel = require("../../database/models/globalModel");

/* ─── Helper: get or create a document ────────────────────── */
async function getOrCreate(Model, query, defaults = {}) {
  let doc = await Model.findOne(query);
  if (!doc) {
    doc = await Model.create({ ...query, ...defaults });
  }
  return doc;
}

/* ─── Data handlers ─────────────────────────────────────────- */
const threadsData = {
  async get(threadID) {
    return getOrCreate(ThreadModel, { threadID: String(threadID) });
  },
  async set(threadID, update) {
    return ThreadModel.findOneAndUpdate(
      { threadID: String(threadID) },
      { $set: update, updatedAt: new Date() },
      { upsert: true, new: true }
    );
  },
  async delete(threadID) {
    return ThreadModel.deleteOne({ threadID: String(threadID) });
  },
  async getAll() {
    return ThreadModel.find({});
  },
};

const usersData = {
  async get(userID) {
    return getOrCreate(UserModel, { userID: String(userID) });
  },
  async set(userID, update) {
    return UserModel.findOneAndUpdate(
      { userID: String(userID) },
      { $set: update, updatedAt: new Date() },
      { upsert: true, new: true }
    );
  },
  async delete(userID) {
    return UserModel.deleteOne({ userID: String(userID) });
  },
  async getAll() {
    return UserModel.find({});
  },
};

const globalData = {
  async get(key) {
    const doc = await GlobalModel.findOne({ key });
    return doc ? doc.value : null;
  },
  async set(key, value) {
    return GlobalModel.findOneAndUpdate(
      { key },
      { value, updatedAt: new Date() },
      { upsert: true, new: true }
    );
  },
  async delete(key) {
    return GlobalModel.deleteOne({ key });
  },
};

/* ─── Main connect function ─────────────────────────────────- */
async function loadDatabase(config) {
  const loader = new Loading("Connecting to MongoDB...");
  loader.start();

  const uri = config.database?.uriMongodb;
  if (!uri || uri === "YOUR_MONGODB_URI_HERE") {
    loader.fail("MongoDB URI not set in config.json");
    log.error("DATABASE", "Please set config.database.uriMongodb in config.json");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    loader.success("MongoDB connected");
  } catch (err) {
    loader.fail(`MongoDB connection failed: ${err.message}`);
    log.error("DATABASE", err.message);
    process.exit(1);
  }

  global.db.threadModel  = ThreadModel;
  global.db.userModel    = UserModel;
  global.db.globalModel  = GlobalModel;
  global.db.threadsData  = threadsData;
  global.db.usersData    = usersData;
  global.db.globalData   = globalData;

  if (config.database?.autoSyncWhenStart) {
    try {
      global.db.allThreadData = await ThreadModel.find({});
      global.db.allUserData   = await UserModel.find({});
      log.success("DATABASE", `Loaded ${global.db.allThreadData.length} threads, ${global.db.allUserData.length} users`);
    } catch (err) {
      log.warn("DATABASE", `Could not pre-load data: ${err.message}`);
    }
  }
}

module.exports = { loadDatabase };
