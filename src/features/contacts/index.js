import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentContactNo, setContacts } from "./contactSlice";
import { useGetAllContactsQuery } from "../api/contactApi";
import * as StatusTypes from '../common/StatusTypes';

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const Contacts = (props) => {
    const contactNo = useSelector(currentContactNo);
    console.log(contactNo);
    const dispatch = useDispatch();
    const {
        data: contacts,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
    } = useGetAllContactsQuery();
    useEffect(() => {
        dispatch(setContacts(contacts));
    }, [contacts]);
    const status = isLoading||isFetching?
        StatusTypes.LOADING:
        isError?
            StatusTypes.ERROR:
            isSuccess?
                StatusTypes.LOADED:
                StatusTypes.UNLOADED;
    console.log(`status: ${status}`);
    return (
      <div className="row">
        <div className="col-7">
            <ContactList contacts={contacts} status={status} error={error?.data}/>
        </div>
        <div className="col-5">
            <ContactForm no={contactNo} />
        </div>
      </div>
    );
}

export default Contacts;