import styled from "styled-components";
import { flexcv } from "../../styles/globalStyle";

export const ChatWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  flex-grow: 1;
  background: var(--sepration);
  display: flex;
  flex-direction: column;
`;

export const ChatInner = styled.div`
  padding: 20px;
  height: 82%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const SendTextWrapper = styled.div`
  width: 100%;
  height: 18%;
  background-color: rgb(245, 245, 245);
  padding: 0 10px;
  display: flex;
  align-items: center;

  .send-message-section {
    width: 85%;
    display: flex;
    justify-content: space-between;
  }
  .send-message-button {
    width: 18%;
  }
  .reload-button-section {
    width: 15%;
  }
  .reload-button {
    width: 80%;
  }
  .send-message-input {
    width: 80%;
  }
`;

export const ChatMessage = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5px;
  justify-content: ${(props) =>
    props.ismine === "true" ? "flex-end" : "flex-start"};
  .chat-message-inner {
    padding: 10px;
    border-radius: 5px;
    background: ${(props) => (props.ismine === "true" ? "#96C291" : "white")};
  }
`;
