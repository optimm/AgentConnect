import React from "react";
import { ChatInner, ChatWrapper, SendTextWrapper } from "./styles";

const ChatComp = ({ id }) => {
  return (
    <ChatWrapper>
      <ChatInner></ChatInner>
      <SendTextWrapper></SendTextWrapper>
    </ChatWrapper>
  );
};

export default ChatComp;
