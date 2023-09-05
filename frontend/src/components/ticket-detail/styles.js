import styled from "styled-components";

export const TicketDataWrapper = styled.div`
  width: 100%;
  max-height: 100vh;
  height: 100vh;
  padding: 50px;
  display: flex;
  flex-direction: column;

  .ticket-title {
    margin-top: 20px;
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
