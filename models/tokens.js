const mongoose = require("mongoose");

const AccessTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  expirationTime: { type: Date, required: true },
});

module.exports = mongoose.model("tokens", AccessTokenSchema);
