const express = require("express");
const router = express.Router();
const { checkForPendingPosts } = require("../helper/changeStreamHandler");

router.get("/check-for-pending-posts", async (req, res) => {
  console.log("Triggered check for pending posts");
  await checkForPendingPosts();
  res.status(200).send("Check for pending posts completed.");
});

module.exports = router;
