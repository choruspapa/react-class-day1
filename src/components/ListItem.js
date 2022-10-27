import React, {Component} from "react";
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ListItem extends Component {

    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection() {
        //this.props.onSelect(this.props.no);
        this.props.handleSelection(this.props.no);
    }
    render() {
        return(
            <li 
                className="list-group-item"
                onClick={this.handleSelection}
            >
                [{this.props.no+1}] name: {this.props.contact.name}, phone: {this.props.contact.phone}
            </li>
        );
    }
}
/* name: {props.contact.name}, phone: {props.contact.phone} */

ListItem.propTypes = {
    contact: PropTypes.object.isRequired,
    no: PropTypes.number.isRequired,
    onSelect: PropTypes.func
}

ListItem.defaultProps = {
    onSelect: () => console.warn("onSelect not defined.")
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSelection: (no) => { dispatch(actions.selectContact(no)) }
    }
}

export default connect(null, mapDispatchToProps)(ListItem);