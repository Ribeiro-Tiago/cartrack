import React from 'react';
import { connect } from 'react-redux'

import "./UserList.css";
import api from '../../services/Api';
import Loader from "../Loader/Loader";
import { SET_USER } from "../../actions/user";
import UserItem from '../UserItem/UserItem';

class UserList extends React.Component {
    filterRef;

    constructor(props) {
        super(props);

        this.filterRef = React.createRef();

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

    onFilterClick = () => {
        console.log(this.filterRef);
    }

    buildSearch() {
        return (
            <div className="search-container">
                <input type="text"
                    placeholder="Some attribute"
                    ref={this.filterRef} />
                <span onClick={this.onFilterClick}>Filtrar</span>
            </div>

        )
    }

    render() {
        if (this.state.isLoading) {
            return (<Loader />);
        }

        return (
            <div className="content" >
                {this.buildSearch()}

                {this.props.users.map(u => <UserItem key={u.id} user={u} />)}
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