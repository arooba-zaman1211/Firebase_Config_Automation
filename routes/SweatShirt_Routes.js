const express = require("express");
const router = express.Router();
const imageController = require("../controllers/SweatShirts/SweatShirt_Controller");

router.post("/upload-image-file", imageController.createAndUploadImage);

module.exports = router;
