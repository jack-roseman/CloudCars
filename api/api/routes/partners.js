const express = require("express");
const router = express.Router();
const PartnerController = require("../controllers/partners");

router.get("/", PartnerController.partners_get_all);
router.post("/", PartnerController.partners_add_partner);
router.patch("/:id", PartnerController.partners_patch_partner);
router.delete("/:id", PartnerController.partners_delete_partner);
router.get("/closest", PartnerController.partners_get_closest);

module.exports = router;
