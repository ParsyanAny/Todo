import React, { Component } from "react";
import "./search-panel.css";
import ItemStatusFilter from "../item-status-filter";

export default class SearchPanel extends Component {
    state={
        term:"",
    }
    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    };
    render() {
        return (
            <div className="search-panel  d-flex">
                <input className="search-input form-control"
                       placeholder=' type to search...'
                       value={this.state.term}
                       onChange={this.onSearchChange}>
                </input>
            </div>)
    }
}