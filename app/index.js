const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const connectDB = require("../config/dbConnection.js");
const cronHelper = require("../helper/cronHelper.js");
const checkForPendingPostsRoute = require("../routes/Products_Routes.js"); // Adjust path as necessary

app.use(express.json());

const RETRY_INTERVAL = 10000;

// Connect to MongoDB with retry logic
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
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
}

// Token check with retry logic
async function tokenCheckWithRetry() {
  while (true) {
    try {
      await cronHelper.checkTokenAndRefresh();
      console.log("Token check and refresh completed successfully");
      break;
    } catch (error) {
      console.error("Token check failed. Retrying in 10 seconds...", error);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
}

// Initialization function to connect to the database and handle token refresh
async function initializeApp() {
  await connectWithRetry();
  await tokenCheckWithRetry();
}

// Use the route for checking pending posts
app.use("/api", checkForPendingPostsRoute);

const PORT = process.env.PORT || 3000;
initializeApp().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
