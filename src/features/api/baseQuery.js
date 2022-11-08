import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/v2',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

export default baseQuery;