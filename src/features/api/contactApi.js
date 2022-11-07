import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setContacts } from '../contacts/contactSlice';

// response: {"data":[{"name":"Minsoo","phone":"010-0001-0001"},{"name":"Sujin","phone":"010-0002-0002"},{"name":"Sonhong","phone":"010-0003-0003"}]}
        
export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v2'}),
    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: () => '/contacts',
            transformResponse: (result) => result.data,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    //dispatch(setContacts(data));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        getContact: builder.query({
            query: (contactId) => `/contacts/${contactId}`,
            transformResponse: (result) => result.data,
        }),
    }),
})

export const { useGetAllContactsQuery, useGetContactQuery } = contactApi;