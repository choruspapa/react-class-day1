import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import CardDetail from "./CardDetail";
import ContactList from "../features/contacts/ContactList";
import { connect } from 'react-redux';

class CardList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            keyword: '',
            contacts: [{
                name: 'Minsoo',
                phone: '010-0001-0001'
            },{
                name: 'Sujin',
                phone: '010-0002-0002'
            },{
                name: 'Sonhong',
                phone: '010-0003-0003'
            }]
        }
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.getContacts = this.getContacts.bind(this);
    }

    getLines(count) {
        return [...Array(count).keys()].map((no) => {
            return(
                <ListItem no={no+1}/>
            );
        });
    }

    getContacts(data) {
        if (this.state.keyword) {
            data = data.filter((contact) => {
                return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) >= 0;
            })
        }
        return data.map((contact, index) => 
            (<ListItem key={index.toString()}
                contact={contact} 
                no={index} 
                /* onSelect={this.handleSelection} */
            />)
        )
    }

    getSelectedContact() {
        if (this.props.selected < 0)
            return ({name:"",phone:""});
        return this.state.contacts[this.props.selected];
    }

    handleSelection(no) {
        console.log(no + "select.");
        this.setState({
            selected: no
        })
    }

    handleFilterChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    render() {
        let content = "col-6";
        let status = "Not selected.";
        if (this.props.selected > -1)
            status = `${this.props.selected + 1}th contact selected.`;
        return (
            <div className={content}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">
                            {this.props.children}
                            <input className="form-control" 
                                id="searchFilter" 
                                type="text"
                                placeholder="Search Filter" 
                                value={this.state.keyword}
                                onChange={this.handleFilterChange}
                            />
                        </p>
                        <ContactList />
                    </div>
                    <div className="card-footer text-muted">{status}</div>
                </div>
                <CardDetail contact={this.getSelectedContact()}/>
            </div>
        );
    }
}

CardList.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number.isRequired
}

CardList.defaultProps = {
    name: 'CardList'
}

const mapStateToProps = (state) => {
    return {
        selected: state.selectContact.no
    }
}

export default CardList;