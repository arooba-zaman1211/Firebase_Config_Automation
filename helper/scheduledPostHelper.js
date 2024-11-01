const {
  postToInsta,
} = require("../controllers/instagrampost/instaController.js");
const postsSchema = require("../models/instaPost.js");
const cron = require("node-cron");
const moment = require("moment-timezone");

const checkForScheduledPosts = async () => {
  try {
    const currentTimePKT = moment().tz("Asia/Karachi");
    const currentTimeUTC = currentTimePKT.utc().startOf("second").toDate();

    const postsToPost = await postsSchema.find({
      status: "pending",
      $expr: {
        $lte: [
          { $dateTrunc: { date: "$date_time", unit: "second" } },
          currentTimeUTC,
        ],
      },
      images: { $not: { $size: 0 } },
    });

    for (let post of postsToPost) {
      try {
        const response = await postToInsta({
          caption: post.caption,
          image_urls: post.images,
        });

        if (response.status === 200) {
          post.status = "posted";
          await post.save();

          await postsSchema.findByIdAndDelete(post._id);
        } else {
          console.error(
            `Failed to post with ID ${post._id}: Received status ${response.status}`
          );
        }
      } catch (error) {
        console.error(`Failed to post with ID ${post._id}:`, error.message);
      }
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
