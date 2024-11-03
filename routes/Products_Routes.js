const express = require("express");
const router = express.Router();
const { checkForPendingPosts } = require("../helper/changeStreamHandler");
const { checkForScheduledPosts } = require("../helper/scheduledPostHelper");
const { checkTokenAndRefresh } = require("../helper/cronHelper");

router.get("/check-for-pending-posts", async (req, res) => {
  console.log("Triggered check for pending posts");
  await checkForPendingPosts();
  res.status(200).send("Check for pending posts completed.");
});

router.get("/check-for-scheduled-posts", async (req, res) => {
  console.log("Triggered check for scheduled posts ");
  await checkForScheduledPosts();
  res.status(200).send("Check for scheduled posts completed.");
});

router.get("/check-for-token", async (req, res) => {
  console.log("Triggered check for token refresh ");
  await checkTokenAndRefresh();
  res.status(200).send("Check for scheduled posts completed.");
});

module.exports = router;
