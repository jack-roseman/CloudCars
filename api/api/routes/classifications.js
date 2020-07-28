const express = require("express");
const router = express.Router();
const ClassificationsController = require("../controllers/classifications");
const checkAuth = require("../middleware/check-auth");

// /classifications
router.get("/", ClassificationsController.classifications_get_all);
router.post("/", ClassificationsController.classifications_add_classification);

// /classifications/:id
router.get(
  "/:id",
  ClassificationsController.classifications_get_classification
);
router.delete(
  "/:id",
  ClassificationsController.classifications_delete_classification
);

module.exports = router;
