import { baseApi } from "./baseApi";
import { authenticateMe } from "../../features/meSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ body }) => {
        return {
          url: "auth/register",
          method: "POST",
          body,
        };
      },
    }),
    login: builder.mutation({
      query: ({ body }) => {
        return {
          url: "auth/login",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const role = data?.data?.role;
        const isAgent = role === "agent";
        const isUser = role === "user";
        const myData = { ...data?.data, isAgent, isUser };
        console.log({ myData });
        dispatch(
          authenticateMe({
            isAuthenticated: true,
            data: myData,
          })
        );
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: `auth/logout`,
          method: "GET",
        };
      },
    }),

    checkMyAuth: builder.query({
      query: () => {
        return {
          url: "auth/me",
          method: "GET",
        };
      },
      providesTags: ["CheckAuth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const role = data?.data?.role;
          const isAgent = role === "agent";
          const isUser = role === "user";
          dispatch(
            authenticateMe({
              isAuthenticated: true,
              data: { ...data?.data, isAgent, isUser },
            })
          );
        } catch (error) {
          dispatch(authenticateMe({ isAuthenticated: false, data: {} }));
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckMyAuthQuery,
} = authApi;
