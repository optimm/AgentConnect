const express = require("express");

const router = express.Router();

const { createTicket, updateTicket } = require("../controllers/ticket");
const { authMiddleware } = require("../middleware/auth");

router.route("/").post(authMiddleware, createTicket);
router.route("/:id").patch(authMiddleware, updateTicket);

module.exports = router;
