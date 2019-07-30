const express = require("express");
const router = express.Router();

const stripeController = require("../controllers/stripe-controller");

router.get("/users/:id/pro", stripeController.proPage);
router.post("/users/:id/pro/charge", stripeController.charge);

module.exports = router;