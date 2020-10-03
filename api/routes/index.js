const router = require("express").Router();
const tripController = require("../../controllers/trip.controllers");

router.post("/trip", tripController.createTrip);

module.exports = router;
