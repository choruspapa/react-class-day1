import React, { useState }  from "react";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";
import { useGetAllContactsQuery } from "../api/contactApi";
import { selectContactNo } from "./contactSlice";
import Contact from "./Contact";

const ContactList = (props) => {
    const [ keyword, setKeyword ] = useState(''); 
    const contactNo = useSelector(selectContactNo);
    let listContent;
    switch (props.status) {
        case "loading":
            listContent = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
            break;
        case "loaded":
            listContent = props.contacts.map((contact, index) => {
                return (
                    <Contact contact={contact} key={index} />
                )
            });
            break;
        case "error":
            listContent = (
                <div className="alert alert-warning" role="alert">
                    ERROR: {JSON.stringify(props.error?.message)}
                </div>
            );
            break;
        default:
            listContent = (
                <div className="d-flex justify-content-center">
                    <span className="visually-hidden">No data...</span>
                </div>
            );
    }

    const handleFilterChange = (e) => {
        setKeyword(e.target.value);
    }
    let status = "Not selected.";
    if (contactNo > -1) {
        status = `The contact of number ${contactNo} has been selected.`;
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">
                    {props.children}
                    <input className="form-control" 
                        id="searchFilter" 
                        type="text"
                        placeholder="Search Filter" 
                        value={keyword}
                        onChange={handleFilterChange}
                    />
                </p>
                <ul className="list-group list-group-flush">
                    {listContent}
                </ul>
            </div>
            <div className="card-footer text-muted">{status}</div>
        </div>
    )
}

ContactList.propTypes = {
    name: PropTypes.string,
}

ContactList.defaultProps = {
    name: 'Contact List'
}

export default ContactList;