const functions = require("firebase-functions");

exports.numberRandom = functions.https.onRequest((req, res) => {
  const number = 1211;
  res.send(number.toString());
});
