const igID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const axios = require("axios");
const db = require("../../models/tokens");

require("dotenv").config();

/**
 * Posts a carousel to Instagram using the provided caption and image URLs.
 * @async
 * @param {Object} params - Parameters for the post.
 * @param {string} params.caption - The caption for the Instagram post.
 * @param {string[]} params.imageUrls - Array of image URLs for the carousel.
 * @returns {Promise<Object>} The status and response data or error message.
 */
const postToInsta = async ({ caption, imageUrls }) => {
  try {
    const tokenRecord = await db.findOne();
    if (!tokenRecord) {
      throw new Error("Instagram token not found in database");
    }
    const igToken = tokenRecord.token;

    const mediaIds = [];
    for (const imageUrl of imageUrls) {
      const mediaUploadResponse = await axios.post(
        `https://graph.facebook.com/v20.0/${igID}/media`,
        {
          image_url: imageUrl,
          media_type: "IMAGE",
          is_carousel_item: true,
          access_token: igToken,
        }
      );

      mediaIds.push(mediaUploadResponse.data.id);
    }

    const carouselPostResponse = await axios.post(
      `https://graph.facebook.com/v20.0/${igID}/media`,
      {
        caption,
        media_type: "CAROUSEL",
        children: mediaIds,
        access_token: igToken,
      }
    );

    const carouselMediaId = carouselPostResponse.data.id;

    const publishResponse = await axios.post(
      `https://graph.facebook.com/v20.0/${igID}/media_publish`,
      {
        creation_id: carouselMediaId,
        access_token: igToken,
      }
    );

    return { status: 200, data: publishResponse.data };
  } catch (error) {
    return { status: 500, error: error.message };
  }
};

module.exports = { postToInsta };
