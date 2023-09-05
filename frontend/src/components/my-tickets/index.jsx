import React from "react";
import { AddTicket } from "./styles";
import { useGetMyTicketsQuery } from "../../app/services/ticketApi";
import { Button } from "@mui/material";
import { TicketsContainer } from "../all-tickets/styles";
import Ticket from "../ticket";

const MyTicketsComp = () => {
  const { data, isLoading, isFetching } = useGetMyTicketsQuery();

  return (
    <>
      <AddTicket>
        <Button color="primary" variant="contained">
          Raise a Query
        </Button>
      </AddTicket>
      {isLoading || isFetching ? (
        <></>
      ) : (
        <TicketsContainer>
          {data?.data?.map((item, index) => (
            <Ticket data={item} key={index} />
          ))}
        </TicketsContainer>
      )}
    </>
  );
};

export default MyTicketsComp;
