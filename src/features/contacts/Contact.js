import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { selectContact, selectContactNo } from "./contactSlice";

const Contact = (props) => {
    const dispatch = useDispatch();
    const no = useSelector(selectContactNo);
    const [ contact, setContact ] = useState(props.contact);

    return(
        <li 
            className="list-group-item"
            onClick={() => dispatch(selectContact(contact.id))}
        >
            [{contact.id}] name: {contact.name}, phone: {contact.phone}
        </li>
    );
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
    no: PropTypes.number.isRequired,
}

Contact.defaultProps = {
    contact: {
        name: '',
        phone: '',
    },
    no: -1,
}

export default Contact;