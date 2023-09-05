import { baseApi } from "./baseApi";

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

    getTicketMessages: builder.mutation({
      query: ({ id }) => {
        return {
          url: `tickets/${id}/message`,
          method: "GET",
        };
      },
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

    getMyTickets: builder.query({
      query: () => {
        return {
          url: "tickets/my",
          method: "GET",
        };
      },
      providesTags: ["MyTickets"],
    }),

    assignTicket: builder.mutation({
      query: ({ id }) => {
        return {
          url: `tickets/${id}/assign`,
          method: "GET",
        };
      },
      invalidatesTags: (result, _error) =>
        result?.success ? ["SingleTicket", "MyTickets", "AssignedTickets"] : [],
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
        result?.success ? ["SingleTicket", "MyTickets", "AssignedTickets"] : [],
    }),

    //send messages
    sendMessage: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `tickets/${id}/message`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useGetAssignedTicketsQuery,
  useGetSingleTicketsQuery,
  useAssignTicketMutation,
  useUpdateTicketMutation,
  useGetTicketMessagesMutation,
  useSendMessageMutation,
  useGetMyTicketsQuery,
} = ticketApi;
