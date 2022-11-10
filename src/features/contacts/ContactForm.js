import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    useAddContactMutation, 
    useUpdateContactMutation,
    useDeleteContactMutation 
} from "../api/contactApi";
import { addContact, selectContact } from "./contactSlice";
import * as StatusTypes from '../common/StatusTypes';

const initialValue = {
    id: 0,
    name: '',
    phone: '',
}

const ContactForm = ({no}) => {
    //const { data: contact, error, isLoading, isFetching } = useGetContactQuery(no, { skip: no < 0});
    const contact = useSelector((state) => {
        let selected = state.contacts.data && state.contacts.data.length > 0?
            state.contacts.data.find((contact) => contact.id === no): 
            initialValue;
        if (!selected) return initialValue;
        return selected;
    });
    const [ addContactApi, addResult ] = useAddContactMutation();    
    const [ updateContactApi, updateResult ] = useUpdateContactMutation();
    const [ deleteContactApi, deleteResult ] = useDeleteContactMutation();
    const dispatch = useDispatch();
    const [ id, setId ] = useState(contact.id);
    const [ name, setName ] = useState(contact.name);
    const [ phone, setPhone ] = useState(contact.phone);

    let status = addResult.isLoading||updateResult.isLoading||deleteResult.isLoading
        ?StatusTypes.LOADING
        :addResult.isError||updateResult.isError||deleteResult.isError
            ?StatusTypes.ERROR
            :StatusTypes.LOADED;
    let error = addResult.isError
        ?addResult.error
        :updateResult.isError
            ?updateResult.error
            :null;
    //console.log(`status: ${status}. error: ${JSON.stringify(error)}`);

    // when get other contact, reset and initialize by new contact.
    useEffect(() => {
        setId(contact.id);
        setName(contact.name);
        setPhone(contact.phone);
        if (updateResult.isError) updateResult.reset();
        if (deleteResult.isError) deleteResult.reset();
    }, [contact]);


    const handleSubmit = async () => {
        const applied = {
            id: no,
            name: name,
            phone: phone,
        }
        //console.log(applied);
        try {
            if (no < 0) 
                // add one and then change number to point to added contact 
                addContactApi(applied).unwrap()
                    .then((result) => {
                        dispatch(addContact(result));
                    });
            else {
                updateContactApi(applied);
                    // .unwrap()
                    // .catch((result) => contactApi.endpoints.updateContact.initiate());
            }
        } catch (err) {
            error = err;
            status = 'error';
        }
    };

    const handleDelete = (e) => {
        deleteContactApi(no);
    }

    const handleReset = (e) => {
        dispatch(selectContact(-1));
    }

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
        case StatusTypes.LOADING:
            formContent = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
            break;
        default:
            const errorMessage = (
                <div className="alert alert-warning" role="alert">
                    ERROR: {error?.data.message}
                </div>
            );
            formContent = (
                <form>
                { status==StatusTypes.ERROR?errorMessage:"" }
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
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="reset" className="btn btn-warning" onClick={handleReset}>Reset</button>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
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