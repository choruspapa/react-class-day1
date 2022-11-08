import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import { setContacts } from '../contacts/contactSlice';

// response: {"data":[{"name":"Minsoo","phone":"010-0001-0001"},{"name":"Sujin","phone":"010-0002-0002"},{"name":"Sonhong","phone":"010-0003-0003"}]}
        
export const contactApi = createApi({
    reducerPath: 'contactApi',
    baseQuery: baseQuery,
    tagTypes: ['Contact'],
    endpoints: (builder) => ({
        getAllContacts: builder.query({
            query: () => '/contacts',
            providesTags: [{ type: 'Contact', id: 'LIST' }],
            transformResponse: (result) => result.data,
            async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    //console.log(getState().auth);
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        getContact: builder.query({
            query: (contactId) => `/contacts/${contactId}`,
            providesTags: (result) => [{ type: 'Contact', id: result.id }],
            transformResponse: (result) => result.data,
        }),
        addContact: builder.mutation({
            query: (body) => ({
                url: '/contacts',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }],

        }),
    }),
})

export const { 
    useGetAllContactsQuery, 
    useGetContactQuery,
    useAddContactMutation,
} = contactApi;