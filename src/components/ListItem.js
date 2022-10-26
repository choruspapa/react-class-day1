import React, {Component} from "react";
import PropTypes from "prop-types";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection() {
        if (this.props.onSelect) {
            this.props.onSelect(this.props.no);
        }
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

export default ListItem;