import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

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
        }),
        getContact: builder.query({
            query: (id) => `/contacts/${id}`,
            providesTags: (result, error) => !error?[{ type: 'Contact', id: result.id }]:[],
            transformResponse: (result) => result.data,
            async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
                try {
                    const { data: result } = await queryFulfilled;
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        addContact: builder.mutation({
            query: (body) => ({
                url: '/contacts',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Contact', id: 'LIST' }],
            transformResponse: (result) => result.data,
        }),
        updateContact: builder.mutation({
            query: (body) => ({
                url: `/contacts/${body.id}`,
                method: 'POST',
                body: body,
            }),
            transformResponse: (result) => result.data,
            invalidatesTags: (result, error, args) => !error
                ?[{ type: 'Contact', id: result.id },{ type: 'Contact', id: 'LIST'}]
                :[{ type: 'Contact', id: 'LIST'}],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `/contacts/${id}`,
                method: 'DELETE'
            }),
            transformResponse: (result) => result.data,
            invalidatesTags: (result, error, args) => !error
                ?[{ type: 'Contact', id: result.id },{ type: 'Contact', id: 'LIST'}]
                :[{ type: 'Contact', id: 'LIST'}],
        }),
    }),
})

export const { 
    useGetAllContactsQuery, 
    useGetContactQuery,
    useAddContactMutation,
    useUpdateContactMutation,
    useDeleteContactMutation,
} = contactApi;