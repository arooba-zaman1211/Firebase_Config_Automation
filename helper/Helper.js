const fs = require("fs");
const axios = require("axios");
let IG_Token = process.env.INSTAGRAM_ACCESS_TOKEN;
const IG_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
const token = process.env.PRINTIFY_ACCESS_TOKEN;
const shopId = process.env.PRINTIFY_SHOP_ID;
const FB_APP_ID = process.env.FB_APP_ID;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

require("dotenv").config();

let tokenExpirationTime = Date.now() + 60 * 24 * 60 * 60 * 1000; // Set initial expiration (60 days from now)
const refreshThreshold = 2 * 24 * 60 * 60 * 1000; // Refresh threshold (2 days before expiration)

// Function to refresh the long-lived access token
async function refreshAccessToken() {
  try {
    console.log("1");
    const shortLivedToken = IG_Token;
    console.log("2");
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

/*const postToInsta = async ({ caption, image_urls }) => {
  try {
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
};*/

const getBase64FromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString("base64"));
      }
    });
  });
};

const generateUniqueFileName = () => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  return `nym_post_${timestamp}.png`;
};

const getImageUrlForColor = (productData) => {
  const colorList = ["Military Green", "Maroon", "Black", "Sport Grey"];

  const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

  console.log(`Selected color: ${randomColor}`);

  return getImage(productData, randomColor);
};

const getImage = (productData, colorTitle) => {
  console.log("1");
  const colorOption = productData.options.find(
    (option) => option.name === "Colors"
  );
  console.log("2");
  console.log(colorOption);

  if (!colorOption) return null;

  const color = colorOption.values.find((c) => c.title === colorTitle);
  console.log("3");
  console.log(color);
  if (!color) return null;

  const colorId = color.id;
  const variant = productData.variants.find((v) => v.options.includes(colorId));
  console.log("4");
  console.log(variant);

  if (!variant) return null;

  // Get all images that belong to the variant
  const variantImages = productData.images.filter((image) => {
    // Check if the image belongs to the variant
    const belongsToVariant = image.variant_ids.includes(variant.id);
    // Extract the camera_label from the image URL if it exists
    const urlParams = new URLSearchParams(image.src.split("?")[1]);
    const cameraLabel = urlParams.get("camera_label");

    // Exclude images if camera_label contains any unwanted terms
    const hasValidCameraLabel =
      !/back|back-2|front-collar-closeup|back-collar-closeup|person-(5|6|7|8)-back|person-(5|6|7|8)-left-sleeve|size-chart|folded|duo|duo-(2|3)/i.test(
        cameraLabel || ""
      );

    return belongsToVariant && hasValidCameraLabel;
  });

  console.log(variantImages);

  // If there are no valid images, return null
  if (variantImages.length === 0) return null;

  // Randomly pick one image from the variant images
  const randomImage =
    variantImages[Math.floor(Math.random() * variantImages.length)];

  console.log(randomImage);

  // Return the URL of the randomly selected image
  return randomImage.src;
};

const uploadImageToPrintify = async (fileName, base64Image, token) => {
  try {
    const response = await axios.post(
      "https://api.printify.com/v1/uploads/images.json",
      { file_name: fileName, contents: base64Image },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.id;
  } catch (error) {
    console.error("Error uploading image to Printify:", error);
    throw error;
  }
};

const publishData = async (productId) => {
  try {
    const requestData = {
      title: true,
      description: true,
      images: true,
      variants: true,
      tags: true,
      keyFeatures: true,
      shipping_template: true,
    };
    const publishResponse = await axios.post(
      `https://api.printify.com/v1/shops/${shopId}/products/${productId}/publish.json`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return publishResponse;
  } catch (error) {
    return error;
  }
};

// Export the helper functions
module.exports = {
  getBase64FromFile,
  generateUniqueFileName,
  postToInsta,
  getImageUrlForColor,
  uploadImageToPrintify,
  publishData,
};
