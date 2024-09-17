const express = require("express");
const app = express();
const imageRoutes = require("../routes/SweatShirt_Routes"); // Import the routes

app.use(express.json()); // To parse JSON body data

app.use("/api/images", imageRoutes);

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
