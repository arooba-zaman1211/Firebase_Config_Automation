let IG_Token = process.env.INSTAGRAM_ACCESS_TOKEN;
const IG_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const FB_APP_ID = process.env.FB_APP_ID;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

require("dotenv").config();

let tokenExpirationTime = Date.now() + 60 * 24 * 60 * 60 * 1000; // Set initial expiration (60 days from now)
const refreshThreshold = 2 * 24 * 60 * 60 * 1000; // Refresh threshold (2 days before expiration)

// Function to refresh the long-lived access token
async function refreshAccessToken() {
  try {
    const shortLivedToken = IG_Token;
    const response = await axios.get(
      `https://graph.facebook.com/oauth/access_token`,
      {
        params: {
          grant_type: "fb_exchange_token",
          client_id: FB_APP_ID,
          client_secret: FB_APP_SECRET,
          fb_exchange_token: shortLivedToken,
        },
      }
    );
    console.log("3");
    console.log("access token is :", response.data.access_token);
    IG_Token = response.data.access_token;
    console.log("4");
    tokenExpirationTime = Date.now() + 60 * 24 * 60 * 60 * 1000;
    console.log("New long-lived token obtained:", IG_Token);
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data);
  }
}

// Function to check if the token is close to expiration
function isTokenExpired() {
  const currentTime = Date.now();
  return tokenExpirationTime - currentTime < refreshThreshold;
}

// Your posting function
const postToInsta = async ({ caption, image_urls }) => {
  try {
    // Check if the token is expired or close to expiration
    if (isTokenExpired()) {
      console.log("Token is close to expiration, refreshing...");
      await refreshAccessToken(); // Refresh the token if necessary
    }
    console.log("New ig token", IG_Token);
    // Step 1: Upload each image to Instagram and get the media IDs
    const mediaIds = [];
    console.log("image urls:", image_urls);
    for (const image_url of image_urls) {
      const mediaUploadResponse = await axios.post(
        `https://graph.facebook.com/v20.0/${IG_ID}/media`,
        {
          image_url,
          media_type: "IMAGE",
          is_carousel_item: true,
          access_token: IG_Token,
        }
      );

      mediaIds.push(mediaUploadResponse.data.id);
    }

    console.log("Media Ids: ", mediaIds);
    // Step 2: Create the carousel post using the collected media IDs
    const carouselPostResponse = await axios.post(
      `https://graph.facebook.com/v20.0/${IG_ID}/media`,
      {
        caption,
        media_type: "CAROUSEL",
        children: mediaIds,
        access_token: IG_Token,
      }
    );

    console.log("carousel Post Response: ", carouselPostResponse);
    // Step 3: Publish the carousel post on Instagram
    const carouselMediaId = carouselPostResponse.data.id;
    const publishResponse = await axios.post(
      `https://graph.facebook.com/v20.0/${IG_ID}/media_publish`,
      {
        creation_id: carouselMediaId,
        access_token: IG_Token,
      }
    );

    console.log("publish Response: ", publishResponse);
    return publishResponse;
  } catch (error) {
    console.error("Error posting carousel to Instagram:", error);
    return error;
  }
};

module.exports = { postToInsta };
