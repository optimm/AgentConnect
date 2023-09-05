import styled from "styled-components";

export const TicketDataWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  gap: 30px;
  .ticket-title {
    font-size: 20px;
    color: var(--text-2);
    font-weight: 500;
  }
  .ticket-buttons {
    width: 100%;
    display: flex;
    gap: 100px;
  }
  .ticket-assign-button {
    width: 150px;
  }
`;


