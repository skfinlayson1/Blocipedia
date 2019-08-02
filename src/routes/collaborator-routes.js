const express = require("express");
const router = express.Router();

const collaboratorController = require("../controllers/collaborator-controller");

router.post("/collaborators/:wikiId/addCollaborator", collaboratorController.addCollaborator);
router.get("/collaborators/:userId/remove", collaboratorController.removeCollaborator);

module.exports = router;