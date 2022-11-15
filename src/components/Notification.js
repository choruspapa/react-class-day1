import React, { Component } from "react";
import PropTypes from "prop-types";

class Notification extends Component {
    constructor (props) {
        super(props);
        this.state = {
        }
        this.handlerClick = this.handlerClick.bind(this);
    }

    handlerClick(arg) {
        this.props.onClick(arg);
    }

    render(){
        return(
            <div className="badge rounded-pill bg-primary ms-1" onClick={this.handlerClick}>
                {this.props.name} {this.props.count}
            </div>
        );
    }
}

Notification.propTypes = {
    title: PropTypes.string,
    count: PropTypes.string,
    onClick: PropTypes.func,
}

Notification.defaultProps = {
    name: "New",
    count: "0"
}

export default Notification;