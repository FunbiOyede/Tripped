class BaseController {
  reply(res, status, message, data) {
    return res.status(status).json({ status: "success", message, data });
  }
}

module.exports = BaseController;
