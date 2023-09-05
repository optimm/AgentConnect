import React from "react";
import MyTicketsComp from "../components/my-tickets";
import { ScrollableRight } from "../styles/globalStyle";

const MyTickets = () => {
  return (
    <ScrollableRight>
      <MyTicketsComp />
    </ScrollableRight>
  );
};

export default MyTickets;
