const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");


// Create new User
router.get("/users/sign_up", userController.signUp);
router.post("/users/sign_up/create", userController.create);
// Login existing User
router.get("/users/sign_in", userController.signIn);
router.post("/users/sign_in/login", userController.login);
// Show User
router.get("/users/:id", userController.show);
// Edit existing User
router.get("/users/:id/edit", userController.edit);
router.post("/users/:id/update", userController.update);
// Delete a User
router.post("/users/:id/delete", userController.destroy);

module.exports = router;