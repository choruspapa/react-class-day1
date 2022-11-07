import { createAction, createSlice } from "@reduxjs/toolkit";

// selectContact action will be made automatically 
// but changeFilter custom action need to be made manually
export const changeFilter = createAction("changeFilter");

// so, changeFilter must be in extraReducers section
const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        filter: '',
        data: [],
        no: -1,
        status: 'init',
    },
    reducers: {
        selectContact: (state, action) => {
            state.no = action.payload;
        },
        setContacts: (state, action) => {
            //console.log(state);
            state.data = action.payload;
            state.status = 'loaded';
        },
        addContact: (state, action) => {
            state.data.push(action.payload);
            console.log(state.data.length);
        },
    },
    extraReducers: {
        [changeFilter]: (state, action) => {
            state.filter = action.payload;
        }
    }
})

export const { selectContact, setContacts, addContact } = contactSlice.actions;

export const selectContactNo = (state) => {
    //console.log(state);
    return state.contacts.no;
}

const dummyContact = {
    id: 0,
    name: '',
    phone: '',
}

export const selectCurrentContact = (state) => {
    console.log('contact no: '+state.contacts.no);
    if (state.contacts.no > 0) {
        let list = state.contacts.data.filter(c => c.id === state.contacts.no);
        console.log(list);
        if (list && list.length > 0)
            return list[0];
    }
    return {
        ...dummyContact
    };
}

export default contactSlice.reducer;