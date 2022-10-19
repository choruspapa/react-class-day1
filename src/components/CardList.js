import React, { Component } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";

class CardList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            keyword: '',
            contracts: [{
                name: 'Minsoo',
                phone: '010-0001-0001'
            },{
                name: 'Sujin',
                phone: '010-0002-0002'
            },{
                name: 'Sonhong',
                phone: '010-0003-0003'
            }]
        }
        this.handleFiterChange = this.handleFiterChange.bind(this);
    }

    getLines(count) {
        return [...Array(count).keys()].map((no) => {
            return(
                <ListItem no={no+1}/>
            );
        });
    }

    getContracts(data) {
        if (this.state.keyword) {
            data = data.filter((contract) => {
                return contract.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) >= 0;
            })
        }
        return data.map((contract, index) => {
            return(<ListItem contract={contract} no={index} />);
        })
    }

    handleFiterChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    render() {
        let content = "col-6";
        return (
            <div className={content}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        <p className="card-text">
                            {this.props.children}
                            <input className="form-control" 
                                id="searchFilter" 
                                type="text"
                                placeholder="Search Filter" 
                                value={this.state.keyword}
                                onChange={this.handleFiterChange}
                            />
                        </p>
                        <ul class="list-group list-group-flush">
                            {this.getContracts(this.state.contracts)}
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