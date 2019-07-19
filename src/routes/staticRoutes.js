const express = require("express");
const staticController = require("../controllers/staticController");

const router = express.Router();

router.get("/", staticController.show);

module.exports = router;