const express = require("express");
const router = express.Router();
const AppointmentsController = require("../controllers/appointments");
const checkAuth = require("../middleware/check-auth");

// /appointments
router.get("/", AppointmentsController.appointments_get_all);

// /appointments/:id
router.get("/:id", AppointmentsController.appointments_get_appointment);
router.delete("/:id", AppointmentsController.appointments_delete_appointment);
router.patch("/:id", AppointmentsController.appointments_patch_appointment);

module.exports = router;
