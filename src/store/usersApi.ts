import type { User } from "@/types/user"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://69bb87d60915748735b967b4.mockapi.io",
  }),
  tagTypes: ["Users"], // Define a tag for users to manage cache invalidation
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/api",
      providesTags: ["Users"], // This tag will be used to invalidate the cache when a user is added, updated, or deleted
    }),
    createUser: builder.mutation<User, Omit<User, "id">>({
      query: (newUser) => ({
        url: "/api",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"], // Invalidate the "Users" tag to refetch the user list after mutating user data
    }),
    updateUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `/api/${user.id}`,
        method: "PUT",
        body: user, 
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"]
    }),
  }),
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation} = usersApi;    