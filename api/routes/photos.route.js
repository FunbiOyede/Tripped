const photoRouter = require("express").Router();
// const { celebrate, Joi, Segments } = require("celebrate");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const config = require("../../config/index");
const s3 = new AWS.S3({
  accessKeyId: config.S3_ACCESS_KEY_ID,
  secretAccessKey: config.S3_SECRET_KEY,
});
//refractor this
let Id = "5fd397f62da63847443696ff";
const userKey = `${Id}/${uuidv4()}.jpeg`;
photoRouter.post("/upload/photo", async (req, res) => {
  //requesting a signedUrl for uploading photos

  const file = req.file;

  let uploadConfig = {
    userKey,
  };
  try {
    const url = s3.getSignedUrl("putObject", {
      Bucket: config.S3_BUCKET_NAME,
      ContentType: "image/jpeg",
      Key: userKey,
    });
    uploadConfig.url = url;
    await axios.put(uploadConfig.url, file, {
      headers: {
        "Content-Type": file.mimetype,
      },
    });
  } catch (error) {
    console.log(error);
  }

  //   res.json({ message: "mary has a little lamb" });
});

// photoRouter.post("/upload", (req, res) => {
//   try {
//     console.log(req.file);
//   } catch (error) {
//     console.log(error);
//   }
// });
module.exports = photoRouter;
