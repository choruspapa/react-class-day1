import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v2'}),
    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: () => '/contacts',
        })
    }),
})

export const { useGetAllContactsQuery } = contactApi;