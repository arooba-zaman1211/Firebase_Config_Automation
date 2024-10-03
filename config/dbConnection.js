const mongoose = require("mongoose");
const { checkForScheduledPosts } = require("../helper/scheduledPostHelper.js");
require("dotenv").config();
const connection_string = process.env.CONNECTION_STRING;
console.log(connection_string);

const connectDB = async () => {
  try {
    await mongoose.connect(connection_string);
    console.log("MongoDB connected");
    checkForScheduledPosts();
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
