const express = require("express");
const router = express.Router();
const imageController = require("../controllers/Products/ProductsController");

router.post("/upload", imageController.createAndUploadImage);

module.exports = router;
