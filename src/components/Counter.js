import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.number
        }
        this.addCount = this.addCount.bind(this);
    }

    addCount() {
        let current = this.state;
        current.value = current.value+1;
        this.setState(current);
    }

    render() {
        let content = "col-6";
        return (
            <div className={content}>
                <div className = "card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <h6 className="card-subtitle text-muted">Number: {this.state.value}</h6>
                        <p className="card-text">{this.props.children}</p>
                        <button className="btn btn-primary" onClick={this.addCount}>Click Me</button>
                    </div>
                </div>
            </div>
        );
    }
}

Counter.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number.isRequired
}

Counter.defaultProps = {
    name: 'Counter'
}

export default Counter;