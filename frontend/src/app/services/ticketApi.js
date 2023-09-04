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
  }),
});

export const { useGetAllTicketsQuery } = ticketApi;
