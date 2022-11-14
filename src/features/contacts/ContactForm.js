import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    useGetContactQuery,
    useAddContactMutation, 
    useUpdateContactMutation,
    useDeleteContactMutation 
} from "../api/contactApi";
import { addContact, selectContact, updateContact } from "./contactSlice";
import * as StatusTypes from '../common/StatusTypes';

const initialValue = {
    id: 0,
    name: '',
    phone: '',
}

const ContactForm = ({no}) => {
    const { data: contact, error: getError, isLoading, isFetching, isError, isUninitialized } 
        = useGetContactQuery(no, { skip: no < 0 });
    // const contact = useSelector((state) => {
    //     let selected = state.contacts.data && state.contacts.data.length > 0?
    //         state.contacts.data.find((contact) => contact.id === no): 
    //         initialValue;
    //     if (!selected) return initialValue;
    //     return selected;
    // });
    const [ addContactApi, addResult ] = useAddContactMutation();    
    const [ updateContactApi, updateResult ] = useUpdateContactMutation();
    const [ deleteContactApi, deleteResult ] = useDeleteContactMutation();
    const dispatch = useDispatch();
    const [ id, setId ] = useState(contact?contact.id:initialValue.id);
    const [ name, setName ] = useState(contact?contact.name:initialValue.name);
    const [ phone, setPhone ] = useState(contact?contact.phone:initialValue.phone);
    const [ errors, setErrors ] = useState({});

    const status = isLoading||isFetching||addResult.isLoading||updateResult.isLoading||deleteResult.isLoading
        ?StatusTypes.LOADING
        :isError||addResult.isError||updateResult.isError||deleteResult.isError
            ?StatusTypes.ERROR
            :StatusTypes.LOADED;
    //console.log(getError);
    const error = isError?
        getError
        :addResult.isError
            ?addResult.error
            :updateResult.isError
                ?updateResult.error
                :null;
    //console.log(`status: ${status}. error: ${JSON.stringify(error)}`);

    // when get other contact, reset and initialize by new contact.
    useEffect(() => {
        console.log(contact);
        setErrors({});
        setId(contact&&!isUninitialized?contact.id:initialValue.id);
        setName(contact&&!isUninitialized?contact.name:initialValue.name);
        setPhone(contact&&!isUninitialized?contact.phone:initialValue.phone);
        if (updateResult.isError) updateResult.reset();
        if (deleteResult.isError) deleteResult.reset();
    }, [contact, isUninitialized]);

    const getErrorMessage = () => {
        const formError = Object.keys(errors).map((field, i) => {
            if (errors[field].length > 0)
                return (
                    <span key={i}>{errors[field]}</span>
                );
        });
        if (formError.length === 0 && !error) return '';
        console.log(formError, error);
        return (
            <div className="alert alert-warning" role="alert">
                {formError?.length > 0?formError:error?error.data.message:''}
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const applied = {
            id: no,
            name: name,
            phone: phone,
        }
        if (!name || name.length === 0) {
            setErrors({name: "Name cannot be blank."});
            return;
        }
        if (!phone || phone.length === 0) {
            setErrors({phone: "Phone cannot be blank."});
            return;
        }
        //console.log(applied);
        if (no < 0) 
            // add one and then change number to point to added contact 
            addContactApi(applied).unwrap()
                .then((result) => {
                    dispatch(addContact(result));
                })
                .catch((error) => console.log(error));
        else {
            updateContactApi(applied)
                .unwrap()
                .then(result => {
                    console.log(result);
                    if (!result.error)
                        dispatch(updateContact(result));
                })
                .catch((error) => console.log(error));
        }
    };

    const handleDelete = (e) => {
        deleteContactApi(no).unwrap()
            .then(result => dispatch(selectContact(-1)));
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
            const buttons = (
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="reset" className="btn btn-warning" onClick={handleReset}>
                        Reset
                    </button>
                    <button type="submit" className={"btn btn-primary"+(error?" disabled":"")} onClick={handleSubmit}>
                        Save
                    </button>
                    <button type="button" className={"btn btn-danger"+(error||no<0?" disabled":"")} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            );
            formContent = (
                <form>
                { getErrorMessage() }
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
                {buttons}
                </form>
            )
    }

    // setId(contact.id);
    // setName(contact.name);
    // setPhone(contact.phone);

    return (
        <div className="card">
            <div className="card-body">
                <h5>Form</h5>
                {formContent}
            </div>
        </div>
    );
}

export default ContactForm;