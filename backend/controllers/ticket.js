const Ticket = require("../db/models/Ticket");
const User = require("../db/models/User");
const Message = require("../db/models/Message");
const formatMessages = require("../utils/formatMessages");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

//getting the tickets
const getAllTickets = async (req, res) => {
  const data = await Ticket.find({});
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getTicket = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  let data = await Ticket.findById(id);
  data = data.toObject();
  let messages = await Message.find({ ticket: id }).sort("-timestamp");
  messages = formatMessages(messages, userId);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: { ...data, messages } });
};

// ticket creation
const createTicket = async (req, res) => {
  const { userId } = req.user;
  const { title } = req.body;
  if (!title) {
    throw new BadRequestError("Please provide a title");
  }
  const ticket = new Ticket({ title, owner: userId });
  await ticket.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Ticket Created" });
};

const assignTicket = async (req, res) => {
  const { id } = req.params;
  const { userId: agentId, isAgent } = req.user;

  if (isAgent) {
    throw new UnauthenticatedError("Cannot assign, access denied");
  }
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new BadRequestError("Ticket not found");
  }

  if (ticket.isAssigned) {
    throw new BadRequestError("Ticket is already assigned");
  } else {
    ticket.assigned = agentId;
    ticket.isAssigned = true;
  }

  await Ticket.deleteOne({ _id: id });
  let updatedTicket = new Ticket(ticket);
  await updatedTicket.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Ticket Assigned" });
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { title, status, severity } = req.body;
  let ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new BadRequestError("Ticket not found");
  }
  ticket = ticket.toObject();

  if (title) {
    ticket.title = title;
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

module.exports = {
  createTicket,
  updateTicket,
  assignTicket,
  getAllTickets,
  getTicket,
};
