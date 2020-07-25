const express = require("express");
const router = express.Router();
const ClassificationsController = require("../controllers/classifications");

router.get("/", ClassificationsController.classifications_get_all);
router.post("/", ClassificationsController.classifications_add_classification);
router.delete(
  "/:id",
  ClassificationsController.classifications_delete_classification
);

module.exports = router;
