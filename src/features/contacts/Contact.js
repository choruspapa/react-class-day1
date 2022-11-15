import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectContact, currentContactNo } from "./contactSlice";

const Contact = (props) => {
    const dispatch = useDispatch();
    const no = useSelector(currentContactNo);
    const [ contact, setContact ] = useState(props.contact);

    return(
        <li className="list-group-item">
            <Link to={contact.id.toString()}>[{contact.id}]</Link>
            <span onClick={() => dispatch(selectContact(contact.id))} >
                name: {contact.name}, phone: {contact.phone}
            </span>
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