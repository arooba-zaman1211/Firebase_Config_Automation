const express = require("express");
const router = express.Router();
const imageController = require("../controllers/LatteMug/MugController");

router.post("/upload-mug-file", imageController.createAndUploadImage);

module.exports = router;
