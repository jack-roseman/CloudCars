const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/vehicles");

router.get("/", VehicleController.vehicles_get_all);
router.post("/", VehicleController.vehicles_add_vehicle);
router.patch("/:id", VehicleController.vehicles_patch_vehicle);
router.delete("/:id", VehicleController.vehicles_delete_vehicle);

module.exports = router;
