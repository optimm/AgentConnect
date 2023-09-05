import { useGetAllTicketsQuery } from "../../app/services/ticketApi";
import { RightPageLoader } from "../loader";
import Ticket from "../ticket";
import { TicketsContainer } from "./styles";

const AllTicketsComponent = () => {
  const { data, isLoading, isFetching } = useGetAllTicketsQuery();

  return (
    <>
      {isLoading || isFetching ? (
        <RightPageLoader />
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
