import React, { Component } from "react";
import PropTypes from "prop-types";

class CardDetail extends Component {
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
            <div className="card">
                <div className="card-body">
                    <h3>Contact</h3>
                    <div className="row">
                        <label htmlFor="username" className="col-sm-4 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control-plaintext" id="username" 
                            value={this.props.contact.name} readOnly/>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="phone" className="col-sm-4 col-form-label">Password</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control-plaintext" id="phone"
                            value={this.props.contact.phone} readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CardDetail.propTypes = {
    contact: PropTypes.object,
}

CardDetail.defaultProps = {
    contact: { name: "", phone: ""}
}

export default CardDetail;