require("dotenv").config();
const { postToInsta } = require("../../helper/Helper.js");
const { createTShirt } = require("../../helper/TshirtHelper.js");
const { createHoodie } = require("../../helper/Hoodiehelper.js");
const { createMug } = require("../../helper/Mughelper.js");
const postsSchema = require("../../models/instaPost.js");
const { createCandle } = require("../../helper/Candlehelper.js");

const createAndUploadImage = async (req, res) => {
  try {
    const name = req.body.nym;
    const type = req.body.type;
    const definition = req.body.definition;

    //const tshirt = await createTShirt(name, type, definition);
    //const hoodie = await createHoodie(name, type, definition);
    //const mug = await createMug(name, type, definition);
    const candle = await createCandle(name, type, definition);
    let caption = "Check out our new Products! #CustomTshirt #Printify";

    /*if (!tshirt || !hoodie || !mug || !candle) {
      res.status(400).send("Error creating and uploading image or product");
    }*/
    const images_url = [candle /*  mug  tshirt, hoodie*/];

    const db = await postsSchema.create({
      urls: images_url,
      status: "pending",
      caption,
      scheduled_time: new Date(Date.now() + 5 * 60 * 1000),
    });

    if (db) {
      console.log("Saved to database");
    }
    res.status(200).json(postToInsta);
  } catch (error) {
    res.status(500).send("Error creating and uploading image or product");
  }
};

module.exports = { createAndUploadImage };
