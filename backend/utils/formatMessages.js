const formatMessages = (messages, userId) => {
  const updatedMessages = messages.map((message) => {
    message = message.toObject();
    if (message.sender == userId) {
      message.mine = true;
    } else {
      message.mine = false;
    }
    return message;
  });

  return updatedMessages;
};

module.exports = formatMessages;
