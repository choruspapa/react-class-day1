import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { contactApi } from "../features/api/contactApi";

export const store = configureStore({
    reducer: {
        [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(contactApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)