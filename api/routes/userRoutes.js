const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizedRoles = require("../middlewares/authorizedRoles");

const router = express.Router();

router.route("/register").post(registerUser);
router
  .route("/list")
  .get(authMiddleware, authorizedRoles(["admin", "user"]), getAllUsers);
router.route("/login").post(loginUser);

module.exports = router;
