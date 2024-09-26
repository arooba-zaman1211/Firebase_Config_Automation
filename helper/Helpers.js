const fs = require("fs");
const axios = require("axios");
const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");
const IG_username = process.env.IG_USERNAME;
const IG_password = process.env.IG_PASSWORD;

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

const postToInsta = async ({ caption, image_url }) => {
  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(IG_username);

    // Login
    await ig.account.login(IG_username, IG_password);

    // Get the image as a buffer
    const imageBuffer = await get({
      url: image_url,
      encoding: null, // Ensures the image is returned as a buffer
    });

    // Publish the photo with caption
    const publishResponse = await ig.publish.photo({
      file: imageBuffer,
      caption: caption,
    });

    console.log("Instagram publish response:", publishResponse);
    return publishResponse.data;
  } catch (error) {
    console.error("Error posting to Instagram:", error);
    throw error;
  }
};

/*const getImageUrlForColor = (productData, colorTitle) => {
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

  const image = productData.images.find((image) =>
    image.variant_ids.includes(variant.id)
  );

  console.log(image);
  return image ? image.src : null;
};*/

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
  const variantImages = productData.images.filter((image) =>
    image.variant_ids.includes(variant.id)
  );

  console.log(variantImages);

  // If there are no images, return null
  if (variantImages.length === 0) return null;

  // Randomly pick an image from the variant images
  const randomImage =
    variantImages[Math.floor(Math.random() * variantImages.length)];

  console.log(randomImage);
  return randomImage ? randomImage.src : null;
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
