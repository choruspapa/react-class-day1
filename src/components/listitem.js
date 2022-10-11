import React, {Component} from "react";
import PropTypes from "prop-types";

class ListItem extends Component {
    render() {
        return(
            <li class="list-group-item">Line no: {this.props.no}/5</li>
        );
    }
}

ListItem.propTypes = {
    no: PropTypes.number.isRequired
}

export default ListItem;