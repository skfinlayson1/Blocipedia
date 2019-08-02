const express = require("express");
const router = express.Router();

const stripeController = require("../controllers/stripe-controller");

router.get("/stripe/:id/pro", stripeController.proPage);
router.post("/stripe/:id/pro/charge", stripeController.charge);
router.get("/stripe/:id/makeMember", stripeController.downgradeToMember);

module.exports = router;