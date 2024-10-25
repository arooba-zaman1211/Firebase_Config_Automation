const express = require("express");
const router = express.Router();
const imageController = require("../controllers/products/productController");

router.post("/upload", imageController.createAndUploadImage);

module.exports = router;
