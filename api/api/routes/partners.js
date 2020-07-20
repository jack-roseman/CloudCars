const express = require("express");
const router = express.Router();
const PartnerController = require("../controllers/partners");

router.get("/", PartnerController.partners_get_all);

router.post("/register", PartnerController.partners_register);

module.exports = router;
