import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useGetContactQuery } from "../api/contactApi";
import { addContact } from "./contactSlice";

const ContactForm = ({no}) => {
    const { data: contact, error, isLoading, isFetching } = useGetContactQuery(no, { skip: no < 0});

    // const [id, setId] = useState(contact.id);
    // const [name, setName] = useState(contact.name);
    // const [phone, setPhone] = useState(contact.phone);
    const id = contact?contact.id:0;
    const name = contact?contact.name:'';
    const phone = contact?contact.phone:'';
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(addContact(contact));
    };

    const handleIdChange = (e) => {
        //setId(e.target.value);
    }
    const handleNameChange = (e) => {
        //setName(e.target.value);
    }
    const handlePhoneChange = (e) => {
        //setPhone(e.target.value);
    }

    let formContent = "";
    if (isLoading || isFetching) {
        console.log("loading....");
        formContent = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    } else if (error) {
        formContent = (
            <div className="alert alert-warning" role="alert">
                ERROR: {error.error}
            </div>
        )
    } else {
        console.log(`contact no: ${no}`);
        formContent = (
            <form>
                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input type="text" className="form-control" id="id" 
                        value={id} onChange={handleIdChange} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" 
                        value={name} onChange={handleNameChange}
                        aria-describedby="nameHelp" placeholder="Enter name" />
                    <small id="nameHelp" className="form-text text-muted">Enter you name.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" 
                        value={phone} onChange={handlePhoneChange}
                        placeholder="Enter phone number" />
                    <small id="phoneHelp" className="form-text text-muted">Enter you phone number.</small>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        )
    }

    // setId(contact.id);
    // setName(contact.name);
    // setPhone(contact.phone);

    return (
        <div className="card">
            <div className="card-body">
                <h5>Contact</h5>
                {formContent}
            </div>
        </div>
    );
}

export default ContactForm;