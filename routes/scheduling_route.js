const express = require("express");
const router = express.Router();
const { checkForScheduledPosts } = require("../helper/scheduledPostHelper");
const { checkTokenAndRefresh } = require("../helper/cronHelper");

router.get("/check-for-scheduled-posts", async (req, res) => {
  console.log("Triggered check for scheduled posts ");
  await checkForScheduledPosts();
  await checkTokenAndRefresh();
  res.status(200).send("Check for scheduled posts completed.");
});

module.exports = router;
