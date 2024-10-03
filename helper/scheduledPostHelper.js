const { postToInsta } = require("./Helper.js");
const postsSchema = require("../models/instaPost.js");
const cron = require("node-cron");

const checkForScheduledPosts = async () => {
  try {
    const currentTime = new Date();

    const postsToPost = await postsSchema.find({
      scheduled_time: { $lte: currentTime },
      status: "pending",
    });

    for (let post of postsToPost) {
      await postToInsta({
        caption: post.caption,
        image_urls: post.urls,
      });

      post.status = "posted";
      await post.save();
      console.log(`Post with ID ${post._id} has been posted to Instagram.`);
    }
  } catch (error) {
    console.error("Error posting scheduled post:", error.message);
  }
};

cron.schedule("* * * * *", () => {
  console.log("Checking for scheduled posts...");
  checkForScheduledPosts();
});

module.exports = { checkForScheduledPosts };
