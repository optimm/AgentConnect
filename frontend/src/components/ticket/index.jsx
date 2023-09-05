import { lineProcessor } from "../../utils/utilFunctions";
import { StatusIcon, TicketWrapper } from "./styles";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Ticket = ({ data }) => {
  const navigate = useNavigate();
  const { myData } = useSelector((state) => state.me);

  return (
    <TicketWrapper
      onClick={() => navigate(`/dashboard/${myData.role}/tickets/${data._id}`)}
    >
      <div className="ticket-title">{lineProcessor(data?.title, 100)}</div>
      <div className="ticket-metadata">
        <div className="ticket-owner">
          <AiOutlineUser />
          <span>{data.owner.name}</span>
        </div>

        <StatusIcon severity={data.severity}>
          <div className="status-dot" />
          <div className="status-text">{data.severity}</div>
        </StatusIcon>

        <StatusIcon status={data.status}>
          <div className="status-dot" />
          <div className="status-text">{data.status}</div>
        </StatusIcon>
      </div>
    </TicketWrapper>
  );
};

export default Ticket;
