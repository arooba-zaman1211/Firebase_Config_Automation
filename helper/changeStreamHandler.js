const mongoose = require("mongoose");
const cron = require("node-cron");
const postsSchema = require("../models/instaPost");
const {
  createAndUploadImage,
} = require("../controllers/products/productController.js");
const connectDB = require("../config/dbConnection.js");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectWithRetry() {
  while (true) {
    try {
      await connectDB();
      console.log("Connected to MongoDB");
      break;
    } catch (error) {
      console.error(
        "Failed to connect to MongoDB. Retrying in 10 seconds...",
        error
      );
      await delay(10000);
    }
  }
}

async function checkForPendingPosts() {
  await connectWithRetry();
  try {
    const pendingPosts = await postsSchema.find({ status: "pending" });

    for (let post of pendingPosts) {
      try {
        console.log(`Processing post with ID: ${post._id}`);

        const req = { body: post };
        const res = {
          status: (code) => ({
            send: (message) =>
              console.log(`Response status: ${code}, message: ${message}`),
          }),
          json: (data) => console.log("Response data:", data),
        };
        await createAndUploadImage(req, res);
        await delay(5000);
      } catch (error) {
        console.error(
          `Failed to process post with ID ${post._id}:`,
          error.message
        );
      }
    }
  } catch (error) {
    console.error("Error checking for pending posts:", error.message);
  }
}

cron.schedule("*/10 * * * *", () => {
  console.log("Checking for pending posts...");
  checkForPendingPosts();
});

module.exports = { checkForPendingPosts };
