import React from "react";
import { useSelector } from "react-redux";
import { selectContactNo } from "./contactSlice";

import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

const ContactMain = (props) => {
    const contactNo = useSelector(selectContactNo);
    return (
      <div className="row">
        <div className="col-6">
            <ContactList />
        </div>
        <div className="col-6">
            <ContactForm no={contactNo}/>
        </div>
      </div>
    );
}

export default ContactMain;