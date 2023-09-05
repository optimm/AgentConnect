import styled from "styled-components";

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
  height: 80px;
  width: 100%;
  background: var(--primary-color-light);
  display: flex;

  .reload-button {
  }
`;

export const ChatMessage = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  .chat-message-inner {
    padding: 10px;
    border-radius: 5px;
    background: ${(props) => (props.isMine ? "#96C291" : "white")};
  }
`;
