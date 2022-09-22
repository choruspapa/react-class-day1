import React, {Component} from "react";
import PropTypes from "prop-types";

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <li class="list-group-item">Line no: {this.props.no}</li>
        );
    }
}

ListItem.propTypes = {
    no: PropTypes.number.isRequired
}

export default ListItem;