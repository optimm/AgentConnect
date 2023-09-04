import { baseApi } from "./baseApi";
import { authenticateMe } from "../../features/meSlice";

export const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: () => {
        return {
          url: "tickets",
          method: "GET",
        };
      },
      providesTags: ["AllTickets"],
    }),

    getAssignedTickets: builder.query({
      query: () => {
        return {
          url: "tickets/assigned",
          method: "GET",
        };
      },
      providesTags: ["AssignedTickets"],
    }),
  }),
});

export const { useGetAllTicketsQuery, useGetAssignedTicketsQuery } = ticketApi;
