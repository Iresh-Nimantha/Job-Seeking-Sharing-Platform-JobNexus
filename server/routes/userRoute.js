const express = require("express");
const {
  loginUser,
  signupUser,
  userUpdate,
  userdetails,
  deleteUserController,
} = require("../controllers/userController");
const router = express.Router();

//get details
router.get("/:id", userdetails);

//login
router.post("/login", loginUser);

//update
router.patch("/:id", userUpdate);

//Signup
router.post("/signup", signupUser);

router.delete("/:userId", deleteUserController);

module.exports = router;
