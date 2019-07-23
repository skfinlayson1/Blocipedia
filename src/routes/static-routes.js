const express = require("express");
const staticController = require("../controllers/static-controller");

const router = express.Router();

router.get("/", staticController.show);

module.exports = router;