const mongoose = require("mongoose");
const postsSchema = require("../models/instaPost");
const {
  createAndUploadImage,
} = require("../controllers/products/productController.js");

async function watchPostCollection() {
  const startWatching = async () => {
    try {
      await mongoose.connection;

      const changeStream = postsSchema.watch();
      changeStream.on("change", async (change) => {
        if (change.operationType === "insert") {
          console.log("New post entry detected:", change.fullDocument);

          const req = { body: change.fullDocument };
          const res = {
            status: (code) => ({
              send: (message) =>
                console.log(`Response status: ${code}, message: ${message}`),
            }),
            json: (data) => console.log("Response data:", data),
          };
          await createAndUploadImage(req, res);
        }
      });

      changeStream.on("error", (error) => {
        console.error("Error in Change Stream:", error);
        // Attempt to restart the change stream after a short delay
        setTimeout(startWatching, 1000);
      });

      console.log("Listening for new entries in posts collection...");
    } catch (error) {
      console.error("Error setting up change stream:", error);
      // Retry starting the change stream after a short delay
      setTimeout(startWatching, 1000);
    }
  };

  startWatching(); // Initial call to start watching the collection
}

module.exports = { watchPostCollection };
