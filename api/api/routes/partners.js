const express = require("express");
const router = express.Router();
const PartnerController = require("../controllers/partners");

// /partners/closest
router.get("/closest", PartnerController.partners_get_closest);

// /partners/:id
router.get("/:id", PartnerController.partners_get_partner);
router.patch("/:id", PartnerController.partners_patch_partner);
router.delete("/:id", PartnerController.partners_delete_partner);

// /partners
router.get("/", PartnerController.partners_get_all);
router.post("/", PartnerController.partners_add_partner);

module.exports = router;
