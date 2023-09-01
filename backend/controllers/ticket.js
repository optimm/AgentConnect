const User = require("../db/models/User");
const Ticket = require("../db/models/Ticket");

const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const createTicket = async (req, res) => {
  const { userId } = req.user;
  const { title, severity } = req.body;
  if (!title) {
    throw new BadRequestError("Please provide a title");
  }
  const ticket = new Ticket({ title, severity, owner: userId });
  await ticket.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Ticket Created" });
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { agentId, severity, status } = req.body;
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new BadRequestError("Ticket not found");
  }
  ticket = ticket.toObject();
  if (agentId != ticket.agentId) {
    if (ticket.isAssigned) {
      throw new BadRequestError("Ticket is already assigned");
    } else {
      ticket.assigned = agentId;
      ticket.isAssigned = true;
    }
  }
  if (severity) {
    ticket.severity = severity;
  }
  if (status) {
    ticket.status = status;
  }
  await Ticket.deleteOne({ _id: id });
  let updatedTicket = new Ticket(ticket);
  await updatedTicket.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Ticket Updated" });
};

module.exports = { createTicket, updateTicket };
