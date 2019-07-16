const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("<p>Hello World<p>");
});

module.exports = router;