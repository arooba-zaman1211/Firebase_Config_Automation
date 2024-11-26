/* const fs = require("fs");
const path = require("path");
const apikeys = require("../exalted-booster-439614-a6-9c58c1977fdf.json");
const SCOPE = ["https://www.googleapis.com/auth/drive"];

// A function that handles authorization, upload, and returns the public URL
async function uploadAndGeneratePublicUrl(filePath) {
  // Authorize
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );
  await jwtClient.authorize();

  const drive = google.drive({ version: "v3", auth: jwtClient });

  // Set file metadata
  const fileMetaData = {
    name: path.basename(filePath), // Use the original file name
    parents: ["1Wi_mYvE0m7p_nghiSkyU0-ADEpkn6P_D"], // Google Drive folder ID
  };

  const media = {
    mimeType: "image/jpg", // Image MIME type
    body: fs.createReadStream(filePath), // Read file stream
  };

  // Upload the file
  const response = await drive.files.create({
    resource: fileMetaData,
    media: media,
    fields: "id", // Only return the file ID
  });

  const fileId = response.data.id;

  // Make the file public
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: "reader",
      type: "anyone", // Anyone can view the file
    },
  });

  // Return the formatted public URL
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=view&authuser=0`;
}

module.exports = { uploadAndGeneratePublicUrl };*/
