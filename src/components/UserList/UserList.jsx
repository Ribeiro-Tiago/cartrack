import React from 'react';
import { connect } from 'react-redux'

import "./UserList.css";
import api from '../../services/Api';
import Loader from "../Loader/Loader";
import { SET_USER, SET_FILTERED_USER } from "../../actions/user";
import UserItem from '../UserItem/UserItem';
import SearchInput from '../SearchInput/SearchInput';
import { SET_IS_LOADING } from '../../actions/loading';

class UserList extends React.Component {
    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        api.fetch("https://jsonplaceholder.typicode.com/users")
            .then(result => {
                this.props.setUsers(result);
                this.props.setFilteredUsers(result);
                this.props.setIsLoading(false);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="content" >
                <SearchInput />

                {this.props.isLoading && <Loader />}

                {!this.props.isLoading && this.props.filteredUsers.map(u => <UserItem key={u.id} user={u} />)}
            </div>
        );
    }
};

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