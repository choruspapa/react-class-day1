import { createAction, createSlice } from "@reduxjs/toolkit";

// selectContact action will be made automatically 
// but changeFilter custom action need to be made manually
export const changeFilter = createAction("changeFilter");

// so, changeFilter must be in extraReducers section
const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        filter: '',
        contacts: [],
        no: -1,
        status: 'init',
    },
    reducers: {
        selectContact: (state, action) => {
            state.no = action.payload;
        }
    },
    extraReducers: {
        [changeFilter]: (state, action) => {
            state.filter = action.payload;
        }
    }
})

const { actions, reducer } = contactSlice;
export const { selectContact } = actions;

export default reducer;