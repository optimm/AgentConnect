const Ticket = require("../db/models/Ticket");
const User = require("../db/models/User");
const Message = require("../db/models/Message");
const formatMessages = require("../utils/formatMessages");

const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

//getting the tickets
const getAllTickets = async (req, res) => {
  const data = await Ticket.find({}).populate("owner", "name email");
  res.status(StatusCodes.OK).json({ success: true, data });
};

//get assigned Tickets
const getAssignedTickets = async (req, res) => {
  const { userId: agentId, isAgent } = req.user;
  if (!isAgent) {
    throw new UnauthenticatedError("Not an agent");
  }
  const data = await Ticket.find({
    assigned: agentId,
  }).populate("owner", "name email");
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getTicket = async (req, res) => {
  const { id } = req.params;

  let data = await Ticket.findById(id).populate("owner", "name email");
  if (!data) {
    throw new NotFoundError("Ticket not found");
  }
  data = data.toObject();
  res.status(StatusCodes.OK).json({ success: true, data });
};

const getTicketMessages = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  let data = await Ticket.findById(id);
  if (!data) {
    throw new NotFoundError("Ticket not found");
  }

  let messages = await Message.find({ ticket: id }).sort("timestamp");
  messages = formatMessages(messages, userId);

  res.status(StatusCodes.OK).json({ success: true, data: messages });
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

  if (!isAgent) {
    throw new UnauthenticatedError("Cannot assign, access denied");
  }
  let ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new BadRequestError("Ticket not found");
  }
  ticket = ticket.toObject();

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

  if (status === "resolved") {
    if (ticket.isAssigned) {
      ticket.isAssigned = false;
      delete ticket.assigned;
    }
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
  getAssignedTickets,
  getTicketMessages,
};
