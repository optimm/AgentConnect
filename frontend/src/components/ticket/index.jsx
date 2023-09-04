import { lineProcessor } from "../../utils/utilFunctions";
import { StatusIcon, TicketWrapper } from "./styles";
import { AiOutlineUser } from "react-icons/ai";

const Ticket = ({ data }) => {
  return (
    <TicketWrapper>
      <div className="ticket-title">{lineProcessor(data?.title, 100)}</div>
      <div className="ticket-metadata">
        <div className="ticket-owner">
          <AiOutlineUser />
          <span>{data.owner.name}</span>
        </div>

        <StatusIcon critical={data.severity === "critical"}>
          <div className="status-dot" />
          <div className="status-text">{data.severity}</div>
        </StatusIcon>

        <StatusIcon resolved={data.status === "resolved"}>
          <div className="status-dot" />
          <div className="status-text">{data.status}</div>
        </StatusIcon>
      </div>
    </TicketWrapper>
  );
};

export default Ticket;
