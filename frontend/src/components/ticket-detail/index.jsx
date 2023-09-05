import React, { useEffect, useState } from "react";
import { TicketDataWrapper } from "./styles";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useAssignTicketMutation,
  useGetSingleTicketsQuery,
} from "../../app/services/ticketApi";
import { ButtonLoader } from "../loader";

const TicketDetailComp = () => {
  const { id } = useParams();
  const { myData } = useSelector((state) => state.me);
  const [ticketData, setTicketData] = useState({});
  const [status, setStatus] = useState("pending");
  const [severity, setSeverity] = useState("generic");
  const { data, isLoading } = useGetSingleTicketsQuery({ id });

  const [assignTicket, { isLoading: isAssignLoading }] =
    useAssignTicketMutation();

  useEffect(() => {
    if (data?.success) {
      setTicketData(data?.data);
    }
    setStatus(data?.data?.status);
    setSeverity(data?.data?.severity);
  }, [data]);

  const handleDataUpdate = () => {};

  const handleAssignTicket = async () => {
    try {
      await assignTicket({ id });
    } catch (error) {}
  };

  return (
    <TicketDataWrapper>
      <div className="ticket-buttons">
        <Button
          variant="contained"
          disabled={ticketData?.isAssigned}
          color={ticketData?.isAssigned ? "success" : "primary"}
          onClick={handleAssignTicket}
          className="ticket-assign-button"
        >
          {ticketData?.isAssigned ? (
            "Assigned"
          ) : isAssignLoading ? (
            <ButtonLoader />
          ) : (
            "Assign to me"
          )}
        </Button>
        <ToggleButtonGroup
          value={status}
          exclusive
          aria-label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <ToggleButton value="resolved" color="success">
            Resolved
          </ToggleButton>
          <ToggleButton value="pending" color="warning">
            Pending
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={severity}
          exclusive
          aria-label="Severity"
          onChange={(e) => setSeverity(e.target.value)}
        >
          <ToggleButton value="generic" color="info">
            Generic
          </ToggleButton>
          <ToggleButton value="critical" color="error">
            Critical
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="ticket-title">{ticketData?.title}</div>
    </TicketDataWrapper>
  );
};

export default TicketDetailComp;
