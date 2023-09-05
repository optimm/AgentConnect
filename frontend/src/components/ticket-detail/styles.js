import styled from "styled-components";

export const TicketDataWrapper = styled.div`
  width: 100%;
  .ticket-title {
    font-size: 20px;
    color: var(--text-2);
    font-weight: 500;
    margin-top: 30px;
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
