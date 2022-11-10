import React, { useState } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import ContactList from "../features/contacts/ContactList";
import ContactForm from "../features/contacts/ContactForm";
import { useSelector } from 'react-redux';
import { currentContactNo } from "../features/contacts/contactSlice";
//import { connect } from 'react-redux';

const CardList = (props) => {
    const contactNo = useSelector(currentContactNo);
    const [ keyword, setKeyword ] = useState(''); 

    const handleFilterChange = (e) => {
        setKeyword(e.target.value);
    }

    let status = "Not selected.";
    let contactForm = "";
    if (contactNo > -1) {
        status = `The contact of number ${contactNo} has been selected.`;
        contactForm = (
            <ContactForm no={contactNo} />
        )
    }
    return (
        <div className="col-6">
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
                    <ContactList />
                </div>
                <div className="card-footer text-muted">{status}</div>
            </div>
            {contactForm}
        </div>
    );
}

CardList.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number.isRequired
}

CardList.defaultProps = {
    name: 'CardList'
}

// const mapStateToProps = (state) => {
//     return {
//         selected: state.selectContact.no
//     }
// }

export default CardList;