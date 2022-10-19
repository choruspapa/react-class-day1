import React, {Component} from "react";
import PropTypes from "prop-types";

class ListItem extends Component {
    render() {
        return(
            <li
                class="list-group-item"
            >
                [{this.props.no+1}] name: {this.props.contract.name}, phone: {this.props.contract.phone}
            </li>
        );
    }
}
/* name: {props.contract.name}, phone: {props.contract.phone} */

ListItem.propTypes = {
    contract: PropTypes.object.isRequired,
    no: PropTypes.number.isRequired
}

export default ListItem;