const formatMessages = (messages, userId) => {
  messages.forEach((message) => {
    if (message.sender == userId) {
      message.mine = true;
    } else {
      message.mine = false;
    }
  });

  return messages;
};

module.exports = formatMessages;
