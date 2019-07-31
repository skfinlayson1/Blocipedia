const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wiki-controller");

router.get("/wikis", wikiController.home);

router.get("/wikis/new", wikiController.new);
router.post("/wikis/create", wikiController.create);

router.get("/wikis/:id", wikiController.show);

router.get("/wikis/:id/edit", wikiController.edit);
router.post("/wikis/:id/update", wikiController.update);

router.get("/wikis/:id/destroy", wikiController.destroy);

module.exports = router; 