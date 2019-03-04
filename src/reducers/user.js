import {
	SET_USER,
	SET_FILTERED_USER
} from '../actions/user';

const initState = {
	users: [],
	filteredUsers: []
}

export default (state = initState, action) => {
	if (action.type === SET_USER) {
		return {
			...state,
			users: action.users
		};
	} else if (action.type === SET_FILTERED_USER) {
		return {
			...state,
			filteredUsers: action.filteredUsers
		};
	}

	return state
}
