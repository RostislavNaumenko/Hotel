import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const user = (getState()).global.user
            console.log("user",user);
            if (!user) {
                return
            }


            headers.set('Authorization', ` Bearer ${user.token}`)
            return headers
        },
    }),
    tagTypes: ["User", "Room", "Workers", "WorkList"],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (id) => `general/user/${id}`,
            providesTags: (result, error, id) => [{ type: "User", id }, "User"],

        }),
        getRooms: builder.query({
            query: () => "management/rooms",
            providesTags: ["Rooms"],
        }),
        getWorkers: builder.query({
            query: () => "client/workers",
            providesTags: ["Workers"],
        }),
        getDailyPlan: builder.query({
            query: () => "management/workList",
            providesTags: ["WorkList"],
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: `management/worker`,
                method: 'POST',
                body: body,
            }),
        }),
        addRoomWork: builder.mutation({
            query: (body) => ({
                url: `management/addRoomStat`,
                method: 'POST',
                body: body,
            }),
        }),
        updateRoomStat: builder.mutation({
            query: (body) => ({
                url: `client/updateRoomStat`,
                method: 'PUT',
                body: body,
            }),
        }),

        loginUser: builder.mutation({
            query: (credentials) => ({
                url: 'client/login',
                method: 'POST',
                body: credentials,
            }),
        }),

    }),
});

export const {
    useGetUserQuery,
    useGetRoomsQuery,
    useGetWorkersQuery,
    useGetDailyPlanQuery,
    useAddUserMutation,
    useAddRoomWorkMutation,
    useUpdateRoomStatMutation,
    useLoginUserMutation,
} = api;