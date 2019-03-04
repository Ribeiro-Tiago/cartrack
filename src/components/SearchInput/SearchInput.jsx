import React from 'react';
import { connect } from 'react-redux'

import "./SearchInput.css";
import { SET_USER, SET_FILTERED_USER } from "../../actions/user";
import { SET_IS_LOADING } from '../../actions/loading';

class UserList extends React.Component {
    filterRef;

    constructor(props) {
        super(props);

        this.state = {
            hasSearchParam: false,
        }

        this.filterRef = React.createRef();
    }

    toggleFilterReset() {
        this.setState(prev => ({
            hasSearchParam: !prev.hasSearchParam
        }))
    }

    onFilterClick() {
        const value = this.filterRef.current.value;

        console.log(value);

        if (!value) {
            return;
        }

        this.props.setIsLoading(true);

        this.toggleFilterReset()

    }

    resetFilter() {
        this.props.setFilteredUsers(this.props.users);
        this.filterRef.current.value = "";
        this.toggleFilterReset();
    }

    buildResetSearch() {
        return (
            <div className="reset-search" onClick={() => this.resetFilter()}>
                <div></div>
                <div></div>
            </div>
        )
    }

    render() {
        return (
            <div className="search-container">
                <input type="text"
                    placeholder="Some attribute"
                    ref={this.filterRef} />

                {this.state.hasSearchParam && this.buildResetSearch()}

                <span onClick={() => this.onFilterClick()}>Filtrar</span>
            </div>
        )
    };
}

export default connect(
    (state) => ({
        users: state.user.users,
        filteredUsers: state.user.filteredUsers,
        isLoading: state.load.isLoading
    }),
    (dispatch) => ({
        setUsers: (users) => dispatch({ type: SET_USER, users }),
        setFilteredUsers: (filteredUsers) => dispatch({ type: SET_FILTERED_USER, filteredUsers }),
        setIsLoading: (isLoading) => dispatch({ type: SET_IS_LOADING, isLoading })
    })
)(UserList);