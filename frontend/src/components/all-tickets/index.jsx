import { useGetAllTicketsQuery } from "../../app/services/ticketApi";
import Ticket from "../ticket";
import { TicketsContainer } from "./styles";

const AllTicketsComponent = () => {
  const { data, isLoading, isFetching } = useGetAllTicketsQuery();

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

export default AllTicketsComponent;
