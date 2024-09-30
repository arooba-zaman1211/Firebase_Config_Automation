const fs = require("fs");
const axios = require("axios");
const IG_Token = process.env.INSTAGRAM_ACCESS_TOKEN;
const IG_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

require("dotenv").config();

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

const postToInsta = async ({ caption, image_urls }) => {
  try {
    // Step 1: Upload each image to Instagram and get the media IDs
    const mediaIds = [];
    console.log(image_urls);
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

const getImageUrlForColor = (productData, colorTitle) => {
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
      !/back|back-2|front-collar-closeup|back-collar-closeup|person-(5|6|7|8)-back|person-(5|6|7|8)-left-sleeve|size-chart/i.test(
        cameraLabel || ""
      );

    return belongsToVariant && hasValidCameraLabel;
  });

  console.log(variantImages);

  // If there are fewer than two images, return null
  if (variantImages.length < 2) return null;

  // Randomly pick two images from the variant images
  const randomImages = variantImages
    .sort(() => 0.5 - Math.random()) // Shuffle the array
    .slice(0, 2); // Pick the first two images

  console.log(randomImages);

  // Return an array of the two image URLs
  return randomImages.map((image) => image.src);
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

// Export the helper functions
module.exports = {
  getBase64FromFile,
  generateUniqueFileName,
  postToInsta,
  getImageUrlForColor,
  uploadImageToPrintify,
};