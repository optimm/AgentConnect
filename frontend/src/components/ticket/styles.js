import styled from "styled-components";

export const TicketWrapper = styled.div`
  height: 100px;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .ticket-title {
    font-size: 15px;
    color: var(--text-2);
  }

  .ticket-metadata {
    display: flex;
    justify-content: space-between;
  }

  .ticket-owner {
    display: flex;
    gap: 5px;
    font-size: 13px;
    color: var(--text-3);
  }
`;

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  .status-text {
    font-size: 13px;
    color: var(--text-3);
    text-transform: capitalize;
  }
  .status-dot {
    background: ${(props) =>
      props.resolved ? "green" : props.critical ? "red" : "yellow"};
    height: 7px;
    width: 7px;
    border-radius: 50%;
  }
`;
