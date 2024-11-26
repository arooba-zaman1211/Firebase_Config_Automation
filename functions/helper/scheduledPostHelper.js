const {
  postToInsta,
} = require("../controllers/instagrampost/instaController.js");
const postsSchema = require("../models/instaPost.js");
const moment = require("moment-timezone");

const checkForScheduledPosts = async () => {
  try {
    const currentTimePKT = moment().tz("Asia/Karachi");
    const currentTimeUTC = currentTimePKT.utc().startOf("second").toDate();

    const postsToPost = await postsSchema.find({
      status: "processed",
      $expr: {
        $lte: [
          {$dateTrunc: {date: "$date_time", unit: "second"}},
          currentTimeUTC,
        ],
      },
      images: {$not: {$size: 0}},
    });

    if (postsToPost.length === 0) {
      console.log("No posts to process.");
      return {success: true};
    }

    let allPostsPosted = true;

    for (const post of postsToPost) {
      try {
        console.log(`Updating status of post ${post._id} to 'posting'`);
        post.status = "posting";
        await post.save();

        const response = await postToInsta({
          caption: post.caption,
          image_urls: post.images,
        });

        console.log(
            `Response for post ${post._id}: ${JSON.stringify(response)}`,
        );

        if (response.status === 200 && post.images.length > 0) {
          console.log(`Post ${post._id} successfully posted.`);
          post.status = "posted";
          await post.save();

          await postsSchema.findByIdAndDelete(post._id);
          console.log(`Post ${post._id} deleted.`);
        } else {
          console.error(
              `Failed to post with ID ${post._id}: Received status ${response.status}`,
          );
          post.status = "pending";
          post.images = [];
          await post.save();
          allPostsPosted = false;
        }
      } catch (error) {
        console.error(`Failed to post with ID ${post._id}:`, error.message);
        post.status = "pending";
        post.images = [];
        await post.save();
        allPostsPosted = false;
      }
    }

    return {success: allPostsPosted};
  } catch (error) {
    console.error("Error posting scheduled posts:", error.message);
    return {success: false};
  }
};

module.exports = {checkForScheduledPosts};
