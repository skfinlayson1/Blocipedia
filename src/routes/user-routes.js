const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller");


// Create new User
router.get("/users/sign_up", userController.signUp);
router.post("/users/sign_up/create", userController.create);
// Login existing User
router.get("/users/sign_in", userController.signIn);
router.post("/users/sign_in/login", userController.login);
// logout a User
router.get("/users/sign_out", userController.signOut);
// Show User
router.get("/users/:id", userController.show);
// Edit existing User
router.get("/users/:id/admin", userController.makeAdmin);
router.get("/users/:id/edit", userController.edit);
router.post("/users/:id/update", userController.update);

module.exports = router;