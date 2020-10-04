const router = require("express").Router();
const tripController = require("../../controllers/trip.controllers");

router.post("/trip", tripController.createTrip);
router.get("/trips", tripController.getTrips);
router.get("/trip/:id", tripController.getTrip);
router.post("/trip/:id", tripController.updateTrip);
router.delete("/trip/:id", tripController.deleteTrip);

module.exports = router;
