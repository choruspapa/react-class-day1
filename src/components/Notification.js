import React, { Component } from "react";
import PropTypes from "prop-types";

class Notification extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
        this.handlerEvent = this.handlerEvent.bind(this);
    }

    handlerEvent(arg) {
        this.setState({
        });
    }

    render(){
        return(
            <span className="badge rounded-pill bg-primary ms-1">
                {this.props.name} {this.props.count}
            </span>
        );
    }
}

Notification.propTypes = {
    title: PropTypes.string,
    count: PropTypes.string,
}

Notification.defaultProps = {
    name: "New",
    count: "0"
}

export default Notification;