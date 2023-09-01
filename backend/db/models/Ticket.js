const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "User",
    required: true,
  },
  assigned: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "User",
  },
  isAssigned: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: [true, "Please provide a ticket title"],
  },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
  severity: {
    type: String,
    enum: ["generic", "critical"],
    default: "generic",
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
