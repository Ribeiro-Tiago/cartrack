import React from 'react';
import { connect } from 'react-redux'

import "./UserList.css";
import api from '../../services/Api';
import Loader from "../Loader/Loader";
import { SET_USER } from "../../actions/user";

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        api.fetch("https://jsonplaceholder.typicode.com/users")
            .then(result => {


                this.props.setUsers(result);

                this.toggleLoading();
            })
            .catch(err => console.log(err));
    }

    toggleLoading = () => {
        this.setState(prevState => ({
            isLoading: !prevState.isLoading
        }));
    }

    render() {
        if (this.state.isLoading) {
            return (<Loader />);
        }

        return (
            <div>
                <ul>
                    {this.props.users.map(u => <li>{u.name}</li>)}
                </ul>
            </div>
        );
    }
};

export default connect(
    (state) => ({
        users: state.user.users
    }),
    (dispatch) => ({
        setUsers: (users) => dispatch({ type: SET_USER, users })
    })
)(UserList);