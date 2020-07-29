const express = require("express");
const router = express.Router();
const PartnerController = require("../controllers/partners");
const checkAuth = require("../middleware/check-auth");

router.get("/all", PartnerController.partners_get_all);
router.get("/closest", PartnerController.partners_get_closest);
router.get("/:id", PartnerController.partners_get_partner);

router.post("/", PartnerController.partners_add_partner);
router.patch("/:id", PartnerController.partners_patch_partner);
router.delete("/:id", PartnerController.partners_delete_partner);

module.exports = router;
