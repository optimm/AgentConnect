const express = require("express");

const router = express.Router();

const { register, login, logout } = require("../controllers/auth");
const { authMiddleware } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);

module.exports = router;
