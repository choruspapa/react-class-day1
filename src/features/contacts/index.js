import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentContactNo } from "./contactSlice";
import { contactApi, useGetNewContactsQuery } from "../api/contactApi";

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Notification from "../../components/Notification";

const Contacts = (props) => {
    const contactNo = useSelector(currentContactNo);
    const { data: count, isLoading, isSuccess, isFetching, isError, error }
        = useGetNewContactsQuery(undefined, { pollingInterval: 3000 });
    const dispatch = useDispatch();
    console.log(contactNo);
    const handleRefresh = (arg) => {
        console.log(arg);
        dispatch(contactApi.util.invalidateTags([{ type: 'Contact', id: 'LIST' }]));
    }
    const notification = isSuccess&&count>0
        ?(<Notification count={count.toString()} onClick={handleRefresh}/>):'';
    return (
        <div className="container">
            <div className="container-fluid p-1 d-flex align-items-center">
                <h4>Contact</h4>{notification} 
            </div>
            <div className="row">
                <div className="col-7">
                    <ContactList />
                </div>
                <div className="col-5">
                    <ContactForm no={contactNo} />
                </div>
            </div>
        </div>
    );
}

export default Contacts;