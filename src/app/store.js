import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { contactApi } from "../features/api/contactApi";
import { selectContact } from "../features/contacts/contactSlice";
import contactReducer from "../features/contacts/contactSlice";

/**
 * [contactApi.reducerPath]: contactApi.reducer,
        [selectContact]: reducer,
 */
export const store = configureStore({
    reducer: {
        [contactApi.reducerPath]: contactApi.reducer,
        contacts: contactReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(contactApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)