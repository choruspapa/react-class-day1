import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { contactApi, useAddContactMutation, useUpdateContactMutation } from "../api/contactApi";
import { addContact, selectContactNo, updateContact } from "./contactSlice";

const initialValue = {
    id: 0,
    name: '',
    phone: '',
}

const ContactForm = ({no, error}) => {
    //const { data: contact, error, isLoading, isFetching } = useGetContactQuery(no, { skip: no < 0});
    const contact = useSelector((state) => {
        let selected = state.contacts.data && state.contacts.data.length > 0?
            state.contacts.data.find((contact) => contact.id === no): 
            initialValue;
        if (!selected) return initialValue;
        return selected;
    });
    const [ addContactApi, { isLoading: addLoading }] = useAddContactMutation();    
    const [ updateContactApi, { isLoading: updateLoading }] = useUpdateContactMutation();
    const dispatch = useDispatch();
    const [ id, setId ] = useState(contact.id);
    const [ name, setName ] = useState(contact.name);
    const [ phone, setPhone ] = useState(contact.phone);

    useEffect(() => {
        setId(contact.id);
        setName(contact.name);
        setPhone(contact.phone);
    }, [contact]);

    let status = (addLoading || updateLoading)?'loading':'loaded';
    const handleSubmit = async () => {
        const applied = {
            id: no,
            name: name,
            phone: phone,
        }
        //console.log(applied);
        try {
            if (no < 0)
                addContactApi(applied).unwrap()
                    .then((result) => {
                        dispatch(addContact(result));
                    });
            else
                updateContactApi(applied).unwrap()
                    .then((result) => {
                        dispatch(updateContact(result));
                        //contactApi.endpoints.getAllContacts.initiate();
                    });
            //dispatch(addContact(contact));
        } catch (err) {
            error = err;
            status = 'error';
        }
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    let formContent = "";
    switch (status) {
        case "loading":
            formContent = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
            break;
        //case "loaded":
        //    break;
        case "error":
            formContent = (
                <div className="alert alert-warning" role="alert">
                    ERROR: {error?.error}
                </div>
            )
            break;
        default:
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