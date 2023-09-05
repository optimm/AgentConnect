import styled from "styled-components";
import { flexcv } from "../../styles/globalStyle";

export const ChatWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  background: var(--sepration);
  display: flex;
  flex-direction: column;
`;

export const ChatInner = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SendTextWrapper = styled.div`
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(245, 245, 245);
  display: flex;

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
    height: 100%;
  }
  .send-message-input {
    width: 80%;
  }
`;

export const ChatMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.ismine === "true" ? "flex-end" : "flex-start"};
  .chat-message-inner {
    padding: 10px;
    border-radius: 5px;
    background: ${(props) => (props.ismine === "true" ? "#96C291" : "white")};
  }
`;
