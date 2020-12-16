const photoRouter = require("express").Router();
const tripController = require("../../controllers/trip.controllers");

const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const config = require("../../config/index");
const auth = require("../../middlewares/auth");

const s3 = new AWS.S3({
  accessKeyId: config.S3_ACCESS_KEY_ID,
  secretAccessKey: config.S3_SECRET_KEY,
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let Id = req.user.userId;
      const userKey = `${Id}/${Date.now().toString()}${uuidv4()}.jpeg`;
      cb(null, userKey);
    },
  }),
});

photoRouter.post(
  "/upload/photo/:id",
  auth.isAuthenticated,
  upload.single("image"),
  tripController.uploadImagesForTrips
);
// photoRouter.post("/upload/photo", upload.single("image"), async (req, res) => {
//   //requesting a signedUrl for uploading photos
//   console.log(req.file);
//   // const file = req.file;

//   // let uploadConfig = {
//   //   userKey,
//   // };
//   // try {
//   //   const url = s3.getSignedUrl("putObject", {
//   //     Bucket: config.S3_BUCKET_NAME,
//   //     ContentType: "image/jpeg",
//   //     Key: userKey,
//   //   });
//   //   uploadConfig.url = url;
//   //   await axios.put(uploadConfig.url, file, {
//   //     headers: {
//   //       "Content-Type": file.mimetype,
//   //     },
//   //   });
//   // } catch (error) {
//   //   console.log(error);
//   // }

//   //   res.json({ message: "mary has a little lamb" });
// });

// photoRouter.post("/upload", (req, res) => {
//   try {
//     console.log(req.file);
//   } catch (error) {
//     console.log(error);
//   }
// });
module.exports = photoRouter;
