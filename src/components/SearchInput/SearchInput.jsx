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

    componentDidMount() {
        window.addEventListener("keyup", this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener("keyup", this.handleKeyPress);
    }

    handleKeyPress = (ev) => {
        const keyCode = ev.keyCode;

        if (keyCode === 27) {
            this.resetFilter();
        } else if (keyCode === 13) {
            this.onFilterClick();
        }
    }

    onFilterClick() {
        const value = this.filterRef.current.value.toLowerCase();

        if (!value) {
            this.resetFilter();
            return;
        }

        this.props.setIsLoading(true);

        this.props.setFilteredUsers(this.props.users.filter(u => {
            const { name, email } = u;

            return name.toLowerCase().indexOf(value) !== -1 || email.toLowerCase().indexOf(value) !== -1;
        }));

        this.props.setIsLoading(false);

        this.setState({
            hasSearchParam: true
        });
    }

    resetFilter() {
        if (!this.state.hasSearchParam) {
            this.filterRef.current.value = "";
            return;
        }

        this.props.setFilteredUsers(this.props.users);
        this.props.setIsLoading(false);
        this.filterRef.current.value = "";

        this.setState({
            hasSearchParam: false
        });
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