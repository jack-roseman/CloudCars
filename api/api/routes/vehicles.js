const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/vehicles");

router.get("/", VehicleController.vehicles_get_all);
router.post("/register", VehicleController.vehicles_register);

module.exports = router;
