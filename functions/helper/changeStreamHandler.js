const postsSchema = require("../models/instaPost");
const {
  createAndUploadImage,
} = require("../controllers/products/productController");

/**
 * Processes a single post, uploads its image, and updates its status.
 * @param {Object} post - The post to process.
 */
async function processPost(post) {
  try {
    console.log(`Processing post with ID: ${post._id}`);
    const req = { body: post };
    let responseStatus;

    const res = {
      status: (code) => {
        responseStatus = code;
        return {
          send: (message) =>
            console.log(`Response status: ${code}, message: ${message}`),
        };
      },
    };

    await createAndUploadImage(req, res);

    if (responseStatus === 400 || responseStatus === 500) {
      post.status = "pending";
      await post.save();
      console.log(
        `Post with ID ${post._id} encountered an error and is set back to pending.`
      );
    } else if (responseStatus === 200) {
      console.log(`Post with ID ${post._id} processed successfully.`);
    }
  } catch (error) {
    console.error(`Failed to process post with ID ${post._id}:`, error.message);
    post.status = "pending";
    await post.save();
  }
}

/**
 * Checks for pending posts and processes them if available.
 */
async function checkForPendingPosts() {
  try {
    const processingPost = await postsSchema.findOne({ status: "processing" });
    if (processingPost) {
      console.log("A post is already being processed. Skipping this cycle.");
      return;
    }

    const post = await postsSchema.findOneAndUpdate(
      { status: "pending" },
      { status: "processing" },
      { new: true }
    );

    if (post) {
      await processPost(post);
    } else {
      console.log("No pending posts found.");
    }
  } catch (error) {
    console.error("Error checking for pending posts:", error.message);
  }
}

module.exports = { checkForPendingPosts };
