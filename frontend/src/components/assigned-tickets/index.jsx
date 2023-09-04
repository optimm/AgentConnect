import React from "react";
import { TicketsContainer } from "../all-tickets/styles";
import { useGetAssignedTicketsQuery } from "../../app/services/ticketApi";

const AssignedTicketsComponent = () => {
  const { data, isLoading, isFetching } = useGetAssignedTicketsQuery();

  return (
    <>
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

export default AssignedTicketsComponent;
