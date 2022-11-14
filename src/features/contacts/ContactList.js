import React, { useState, useEffect }  from "react";
import { PropTypes } from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllContactsQuery } from "../api/contactApi";
import { currentContactNo, setContacts } from "./contactSlice";
import * as StatusTypes from '../common/StatusTypes';
import Contact from "./Contact";

const ContactList = (props) => {
    const [ keyword, setKeyword ] = useState(''); 
    const contactNo = useSelector(currentContactNo);
    
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
    let listContent;
    switch (status) {
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
            if (contacts && contacts.length > 0)
                listContent = contacts.map((contact, index) => {
                    return (
                        <Contact contact={contact} key={index} />
                    )
                });
            break;
        case "error":
            listContent = (
                <div className="alert alert-warning" role="alert">
                    ERROR: {JSON.stringify(error?.message)}
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
    const statusLine = contactNo < 0
        ?"Not selected."
        :`The contact of number ${contactNo} has been selected.`;
    
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    {props.name}
                </h5>
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
            <div className="card-footer text-muted">{statusLine}</div>
        </div>
    )
}

ContactList.propTypes = {
    name: PropTypes.string,
}

ContactList.defaultProps = {
    name: 'List'
}

export default ContactList;