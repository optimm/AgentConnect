const { StatusCodes } = require("http-status-codes");
const Message = require("../db/models/Message");
const { BadRequestError } = require("../errors");
const Ticket = require("../db/models/Ticket");

const sendMessage = async (req, res) => {
  const { id: ticketId } = req.params;

  let data = await Ticket.findById(ticketId);
  if (!data) {
    throw new NotFoundError("Ticket not found");
  }

  const { userId } = req.user;
  const { text } = req.body;
  if (!text) {
    throw new BadRequestError("Empty Message");
  }
  const message = new Message({ text, sender: userId, ticket: ticketId });
  await message.save();
  res.status(StatusCodes.OK).json({ success: true, msg: "Message Sent" });
};

module.exports = { sendMessage };
