const express = require("express");
const router = express.Router();
const AppointmentsController = require("../controllers/appointments");
const checkAuth = require("../middleware/check-auth");

// /appointments/all
router.get("/all", AppointmentsController.appointments_get_all);

// /appointments/book
router.post("/book", AppointmentsController.appointments_add_appointment);

// /appointments/:partner_id
router.get("/:id", AppointmentsController.appointments_get_appointment);
router;
// router.delete("/:id", AppointmentsController.appointments_delete_appointment);
// router.patch("/:id", AppointmentsController.appointments_patch_appointment);

module.exports = router;
