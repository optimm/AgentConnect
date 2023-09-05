const express = require("express");

const router = express.Router();

const {
  createTicket,
  updateTicket,
  assignTicket,
  getAllTickets,
  getTicket,
  getAssignedTickets,
  getTicketMessages,
} = require("../controllers/ticket");
const { authMiddleware } = require("../middleware/auth");
const { sendMessage } = require("../controllers/message");

router
  .route("/")
  .post(authMiddleware, createTicket)
  .get(authMiddleware, getAllTickets);

router.route("/assigned").get(authMiddleware, getAssignedTickets);
router
  .route("/:id")
  .patch(authMiddleware, updateTicket)
  .get(authMiddleware, getTicket);

router.route("/:id/assign").get(authMiddleware, assignTicket);

router
  .route("/:id/message")
  .post(authMiddleware, sendMessage)
  .get(authMiddleware, getTicketMessages);

module.exports = router;
