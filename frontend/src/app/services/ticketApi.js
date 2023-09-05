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

    getSingleTickets: builder.query({
      query: ({ id }) => {
        return {
          url: `tickets/${id}`,
          method: "GET",
        };
      },
      providesTags: ["SingleTicket"],
    }),

    getTicketMessages: builder.query({
      query: ({ id }) => {
        return {
          url: `tickets/${id}/message`,
          method: "GET",
        };
      },
      providesTags: ["TicketMessages"],
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

    assignTicket: builder.mutation({
      query: ({ id }) => {
        return {
          url: `tickets/${id}/assign`,
          method: "GET",
        };
      },
      invalidatesTags: (result, _error) =>
        result?.success ? ["SingleTicket"] : [],
    }),

    updateTicket: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `tickets/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: (result, _error) =>
        result?.success ? ["SingleTicket"] : [],
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useGetAssignedTicketsQuery,
  useGetSingleTicketsQuery,
  useAssignTicketMutation,
  useUpdateTicketMutation,
  useGetTicketMessagesQuery,
} = ticketApi;
