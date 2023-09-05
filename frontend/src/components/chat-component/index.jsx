import React, { useEffect, useState } from "react";
import { ChatInner, ChatMessage, ChatWrapper, SendTextWrapper } from "./styles";
import {
  useGetTicketMessagesMutation,
  useSendMessageMutation,
} from "../../app/services/ticketApi";
import { Button, TextField } from "@mui/material";
import { BiSolidSend } from "react-icons/bi";
import { ButtonLoader } from "../loader";
import { useSelector } from "react-redux";

const ChatComp = ({ id, canMessage = false }) => {
  const { myData } = useSelector((state) => state.me);
  const [getMessages, { isLoading }] = useGetTicketMessagesMutation();
  const [sendMessage, { isLoading: isSendMessageLoading }] =
    useSendMessageMutation();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const getAllMessages = async () => {
    try {
      const { data } = await getMessages({ id });
      if (data?.success) {
        setMessages(data?.data);
      }
    } catch (error) {}
  };

  const handleSendMessage = async () => {
    try {
      const { data } = await sendMessage({ id, body: { text } });
      if (data?.success) {
        await getAllMessages();
        setText("");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <ChatWrapper>
      <ChatInner>
        {messages?.map((item, index) => (
          <ChatMessage ismine={item?.mine ? "true" : undefined} key={index}>
            <div className="chat-message-inner">{item?.text}</div>
          </ChatMessage>
        ))}
      </ChatInner>
      {canMessage && (
        <SendTextWrapper>
          <div className="reload-button-section">
            <Button
              variant="contained"
              className="reload-button"
              onClick={getAllMessages}
            >
              {isLoading ? <ButtonLoader /> : "Reload"}
            </Button>
          </div>
          <div className="send-message-section">
            <TextField
              name="text"
              label="Message"
              variant="outlined"
              color="primary"
              className="send-message-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Button
              variant="contained"
              className="send-message-button"
              endIcon={isSendMessageLoading ? <></> : <BiSolidSend />}
              disabled={!text || text === ""}
              onClick={handleSendMessage}
            >
              {isSendMessageLoading ? <ButtonLoader /> : "Send"}
            </Button>
          </div>
        </SendTextWrapper>
      )}
    </ChatWrapper>
  );
};

export default ChatComp;
