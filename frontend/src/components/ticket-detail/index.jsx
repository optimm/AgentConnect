import React, { useState } from "react";
import { TicketDataWrapper } from "./styles";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSelector } from "react-redux";

const TicketDetailComp = () => {
  const { myData } = useSelector((state) => state.me);
  const [status, setStatus] = useState("pending");
  const [severity, setSeverity] = useState("generic");

  const handleDataUpdate = () => {};

  return (
    <TicketDataWrapper>
      <div className="ticket-title">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab explicabo,
        error reprehenderit sapiente veniam fugit illum rerum odit aliquam.
        Cupiditate?
      </div>
      <div className="ticket-buttons">
        <Button variant="contained">Assign to me</Button>
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
    </TicketDataWrapper>
  );
};

export default TicketDetailComp;
