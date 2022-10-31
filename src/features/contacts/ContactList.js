import React from "react";
import { useGetAllContactsQuery } from "../api/contactApi";
import ListItem from "../../components/ListItem";

function ContactList() {
    const {
        data: contacts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetAllContactsQuery();
    let listContent
    if (isLoading) {
        listContent = (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else if (isSuccess) {
        console.log(contacts);
        listContent = contacts.map((contact, index) => {
            return (
                <ListItem contact={contact} no={index} />
            )
        })
    } else if (isError) {
        console.log(error);
        listContent = (
            <div className="alert alert-warning" role="alert">
                {error.error}
            </div>
        )
    }
    return (
        <ul className="list-group list-group-flush">
            {listContent}
        </ul>
    )
}

export default ContactList;