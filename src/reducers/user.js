import {
	SET_USER
} from '../actions/user';

const initState = {
	users: []
}

export default (state = initState, action) => {
	if (action.type === SET_USER) {
		return {
			...state,
			users: action.users
		};
	}

	return state
}
