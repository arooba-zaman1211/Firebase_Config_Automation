const express = require("express");
const router = express.Router();
const imageController = require("../controllers/Hoodie/HoodieController");

router.post("/upload-hoodie-file", imageController.createAndUploadImage);

module.exports = router;
