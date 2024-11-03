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
      status: "processed",
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
        // Update status to "posting" to prevent other processes from picking it up
        post.status = "posting";
        await post.save();

        const response = await postToInsta({
          caption: post.caption,
          image_urls: post.images,
        });

        if (response.status === 200 && post.images.length > 0) {
          post.status = "posted";
          await post.save();
          await postsSchema.findByIdAndDelete(post._id);
        } else {
          console.error(
            `Failed to post with ID ${post._id}: Received status ${response.status}`
          );
          post.status = "pending";
          post.images = [];
          await post.save();
        }
      } catch (error) {
        console.error(`Failed to post with ID ${post._id}:`, error.message);
        post.status = "pending";
        post.images = [];
        await post.save();
      }
    }
  } catch (error) {
    console.error("Error posting scheduled post:", error.message);
  }
};

module.exports = { checkForScheduledPosts };
