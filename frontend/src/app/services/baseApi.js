import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApplicationConfig } from "../../config";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ApplicationConfig.backendUrl}/`,
    credentials: "include",
  }),
  tagTypes: [
    "CheckAuth",
    "AllTickets",
    "SingleTicket",
    "AssignedTickets",
    "MyTickets",
  ],
  endpoints: () => ({}),
});
