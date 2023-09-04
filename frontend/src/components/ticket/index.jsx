import { StatusIcon, TicketWrapper } from "./styles";
import { AiOutlineUser } from "react-icons/ai";

const Ticket = ({ data }) => {
  return (
    <TicketWrapper>
      <div className="ticket-title">
        Hello my back account is not working please make sure it works
      </div>
      <div className="ticket-metadata">
        <div className="ticket-owner">
          <AiOutlineUser />
          <span>Ayush Saxena</span>
        </div>

        <StatusIcon critical={true}>
          <div className="status-dot" />
          <div className="status-text">critical</div>
        </StatusIcon>

        <StatusIcon resolved={true}>
          <div className="status-dot" />
          <div className="status-text">resolved</div>
        </StatusIcon>
      </div>
    </TicketWrapper>
  );
};

export default Ticket;
