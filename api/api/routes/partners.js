const express = require("express");
const router = express.Router();
const PartnerController = require("../controllers/partners");

router.get("/", PartnerController.partners_get_all);
router.post("/", PartnerController.partners_add_partner);

module.exports = router;
