import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

const ContactView = () => {
    const id = useParams().id;
    const contact = useSelector((state) => {
        if (state.contacts.data) {
            return state.contacts.data.find((contact) => contact.id.toString() === id);
        }
    });
    //console.log(contact);

    return (
        <div>
            <div>ID: {id}</div>
            <div>{contact.name}</div>
        </div>
    );
}

export default ContactView;