BaseController = require("./controller");
const imageServices = require("../services/image.service");
const AWS = require("aws-sdk");
const config = require("../config/index");
const s3 = new AWS.S3({
  accessKeyId: config.S3_ACCESS_KEY_ID,
  secretAccessKey: config.S3_SECRET_KEY,
});
class ImageController extends BaseController {
  async uploadImagesForTrips(req, res, next) {
    const { id } = req.params;
    const { key } = req.file;

    try {
      const trip = await imageServices.uploadImages(id, key);

      super.reply(res, httpStatus.OK, "The image was successfully added", trip);
    } catch (error) {
      next(error);
    }
  }

  async deleteImagesForTrips(req, res, next) {
    const { id } = req.params;
    const { image_key } = req.query;

    let params = {
      Bucket: config.S3_BUCKET_NAME,
      Key: image_key,
    };

    try {
      await s3.deleteObject(params).promise();
      const data = await imageServices.deleteImage(id, image_key);
      super.reply(
        res,
        httpStatus.OK,
        "The image was successfully deleted",
        data
      );
    } catch (error) {
      next(error);
    }

    // s3.deleteObject(params, function (err, data) {
    //   if (err) next(err);
    //   else {
    //     console.log(data);
    //   }
    // });
  }
}

module.exports = new ImageController();
