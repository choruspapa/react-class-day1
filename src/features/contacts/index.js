import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { currentContactNo } from "./contactSlice";

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import Notification from "../../components/Notification";

const Contacts = (props) => {
    const contactNo = useSelector(currentContactNo);
    console.log(contactNo);
    return (
        <div className="container">
            <div className="container-fluid p-1 d-flex align-items-center">
                <h4>Contact</h4> <Notification count="0" />  
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