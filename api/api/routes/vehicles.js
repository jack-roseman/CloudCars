const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/vehicles");

router.get("/", VehicleController.vehicles_get_all);
router.post("/", VehicleController.vehicles_add_vehicle);

module.exports = router;
