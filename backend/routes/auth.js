const express = require("express");

const router = express.Router();

const { register, login, logout, checkMyAuth } = require("../controllers/auth");
const { authMiddleware } = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);
router.route("/me").get(authMiddleware, checkMyAuth);

module.exports = router;
