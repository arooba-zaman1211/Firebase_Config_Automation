const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const productRoutes = require("../routes/Products_Routes");
const connectDB = require("../config/dbConnection.js");
const { watchPostCollection } = require("../helper/changeStreamHandler.js");
const cronHelper = require("../helper/cronHelper.js");

//to be removed
const { NymPosttwo } = require("../services/nymPost_2.jsx");
const { NymPostsix } = require("../services/nymPost_6.jsx");
const fs = require("fs");
const path = require("path");
const { generateUniqueFileName } = require("../helper/helper.js");

app.use(express.json());

const RETRY_INTERVAL = 10000;

async function connectWithRetry() {
  while (true) {
    try {
      await connectDB();
      console.log("Connected to MongoDB");
      break;
    } catch (error) {
      console.error(
        "Failed to connect to MongoDB. Retrying in 10 seconds...",
        error
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
}

async function tokenCheckWithRetry() {
  while (true) {
    try {
      await cronHelper.checkTokenAndRefresh();
      console.log("Token check and refresh completed successfully");
      break;
    } catch (error) {
      console.error("Token check failed. Retrying in 10 seconds...", error);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
    }
  }
}

async function initializeApp() {
  await connectWithRetry();
  watchPostCollection();
  await tokenCheckWithRetry();
}

app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 3000;
initializeApp().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// to be removed

//design 2 15oz, left= 152 for 11oz
/*
15oz
const whiteCard = new NymPostfive({
  width: 2475,
  height: 1275,
  nymFontSize: "160px",
  nymLineHeight: "155px",
  Nym: "If at first you don’t succeed, give up, it’s easier",
  NymColor: "#000000",
  formatNym: false,
  top: 558,
  left: 84,
  nymWidth: 920,
  nymHeight: 182,
});*/

/*
11oz
const whiteCard = new NymPostfive({
  width: 2475,
  height: 1155,
  nymFontSize: "160px",
  nymLineHeight: "155px",
  Nym: "If at first you don’t succeed, give up, it’s easier",
  NymColor: "#000000",
  formatNym: false,
  top: 452,
  left: 152,
  nymWidth: 920,
  nymHeight: 182,
});*/

//design 1 15oz left= 50 for 11oz
/*
11oz
const whiteCard = new NymPostsix({
  width: 2475,
  height: 1155,
  nymFontSize: "160px",
  nymLineHeight: "17px",
  definitionFontSize: "67px",
  definitionLineHeight: "17px",
  Nym: "Hi i am nat",
  Definition: "short for natural disaster",
  NymColor: "#000000",
  formatNym: true,
  top: 360,
  definitionTop: 547,
  left: 76,
  nymWidth: 920,
  definitionWidth: 849,
  nymHeight: 182,
  definitionHeight: 88,
});*/

/*
15oz
const whiteCard = new NymPostsix({
  width: 2475,
  height: 1275,
  nymFontSize: "160px",
  nymLineHeight: "17px",
  definitionFontSize: "67px",
  definitionLineHeight: "17px",
  Nym: "Hi i am nat",
  Definition: "short for natural disaster",
  NymColor: "#000000",
  formatNym: true,
  top: 460,
  definitionTop: 547,
  left: 50,
  nymWidth: 920,
  definitionWidth: 849,
  nymHeight: 182,
  definitionHeight: 88,
});*/

/*
15oz
const whiteCard = new NymPostfive({
  width: 2475,
  height: 1275,
  nymFontSize: "160px",
  nymLineHeight: "155px",
  Nym: "caught\nflipping\nagain",
  NymColor: "#000000",
  formatNym: true,
  top: 546,
  left: 40,
  nymWidth: 920,
  nymHeight: 182,
});
*/

/*
11oz
const whiteCard = new NymPostfive({
  width: 2475,
  height: 1155,
  nymFontSize: "160px",
  nymLineHeight: "155px",
  Nym: "caught\nflipping\nagain",
  NymColor: "#000000",
  formatNym: true,
  top: 470,
  left: 76,
  nymWidth: 920,
  nymHeight: 182,
});
*/

whiteCard = new NymPostsix({
  width: 2475,
  height: 1155,
  nymFontSize: "160px",
  nymLineHeight: "17px",
  definitionFontSize: "67px",
  definitionLineHeight: "17px",
  Nym: "Hi! I'm Maya",
  Definition: "short for Mayonnaise",
  NymColor: "#A92A1A",
  formatNym: true,
  top: 360,
  definitionTop: 547,
  left: 76,
  nymWidth: 920,
  definitionWidth: 849,
  nymHeight: 182,
  definitionHeight: 88,
});

const saveWhiteCard = async () => {
  try {
    const whiteImage = await whiteCard.build({ format: "png" }); // Await the result of build
    const whiteFileName = generateUniqueFileName();
    const whiteFilePath = path.join(
      __dirname,
      "../public/assets/images",
      whiteFileName
    );

    // Save the white image to the file system
    fs.writeFileSync(whiteFilePath, whiteImage); // Now whiteImage will be a Buffer
    console.log("Image saved successfully:", whiteFilePath);
  } catch (error) {
    console.error("Error saving image:", error);
  }
};

// Call the async function to save the image
saveWhiteCard();
