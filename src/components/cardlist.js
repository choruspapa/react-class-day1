import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItem from "./listitem";

class CardList extends Component {
    getLines(count) {
        return [...Array(count).keys()].map((no) => {
            return(
                <ListItem no={no+1}/>
            );
        });
    }

    render() {
        let content = "col-6";
        return (
            <div className={content}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">{this.props.children}</p>
                        <ul class="list-group list-group-flush">
                            {this.getLines(this.props.number)}
                        </ul>
                    </div>
                    <div class="card-footer text-muted">
                        2 days ago
                    </div>
                </div>
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

export default CardList;