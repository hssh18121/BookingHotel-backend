const FOLDER_ID = process.env.PARENT_FOLDER;
const fs = require("fs");
const { google } = require("googleapis");

const auth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
auth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: auth2Client,
});
const BASE_URL = "https://drive.google.com/uc?export=view&id=";
async function uploadFile(file) {
  if (file.type != "image/png" && file.type != "image/jpeg") {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    throw new Error("File must be jpg or jpeg");
  }
  try {
    const createFile = await drive.files.create({
      resource: {
        name: file.name,
        mimeType: file.type,
        parents: [FOLDER_ID],
      },
      media: {
        mimeType: file.type,
        body: fs.createReadStream(file.path),
      },
    });
    fs.unlink(file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return BASE_URL + createFile.data.id;
  } catch (error) {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.log(err);
      }
    });
    // console.log(error);
    throw error;
  }
}
async function deleteFile(fileId = "") {
  try {
    let res = await drive.files.delete({ fileId });
  } catch (error) {
    throw error;
  }
}
async function updateFile(file) {}
module.exports = {
  uploadFile,
  deleteFile,
  updateFile,
};
