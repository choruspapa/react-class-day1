import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectContactNo, setContacts } from "./contactSlice";
import { useGetAllContactsQuery } from "../api/contactApi";

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const Contacts = (props) => {
    const contactNo = useSelector(selectContactNo);
    console.log(contactNo);
    const dispatch = useDispatch();
    const {
        data: contacts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAllContactsQuery();
    useEffect(() => {
        dispatch(setContacts(contacts));
    }, [contacts]);
    const status = isLoading?"loading":isError?"error":isSuccess?"loaded":"unloaded";
    return (
      <div className="row">
        <div className="col-8">
            <ContactList contacts={contacts} status={status} error={error?.data}/>
        </div>
        <div className="col-4">
            <ContactForm no={contactNo} status={status} error={error?.data}/>
        </div>
      </div>
    );
}

export default Contacts;