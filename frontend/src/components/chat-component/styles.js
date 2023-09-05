export const ChatWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  background: var(--sepration);
  display: flex;
  flex-direction: column;
`;

export const ChatInner = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const SendTextWrapper = styled.div`
  height: 80px;
  width: 100%;
  background: var(--primary-color-light);
  display: flex;

  .reload-button {
  }
`;
