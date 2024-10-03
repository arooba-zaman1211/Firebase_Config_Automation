const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  urls: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  scheduled_time: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("posts", postsSchema);
