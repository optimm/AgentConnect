import React, { useEffect, useState } from "react";
import { ChatInner, ChatMessage, ChatWrapper, SendTextWrapper } from "./styles";
import { useGetTicketMessagesQuery } from "../../app/services/ticketApi";

const ChatComp = ({ id }) => {
  const { data, isLoading } = useGetTicketMessagesQuery({ id });
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data?.success) {
      setMessages(data?.data);
    }
  }, [data]);

  return (
    <ChatWrapper>
      <ChatInner>
        {messages?.map((item, index) => (
          <ChatMessage isMine={item?.mine} key={index}>
            <div className="chat-message-inner">{item?.text}</div>
          </ChatMessage>
        ))}
      </ChatInner>
      <SendTextWrapper></SendTextWrapper>
    </ChatWrapper>
  );
};

export default ChatComp;
