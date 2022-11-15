import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentContactNo } from "./contactSlice";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const ContactMain = (props) => {
    const contactNo = useSelector(currentContactNo);

    return (
        <div className="row">
            <div className="col-7">
                <ContactList />
            </div>
            <div className="col-5">
                <ContactForm no={contactNo} />
            </div>
        </div>
    );
}

export default ContactMain;