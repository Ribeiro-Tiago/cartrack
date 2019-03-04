import {
	SET_IS_LOADING
} from '../actions/loading';

const initState = {
	isLoading: true
}

export default (state = initState, action) => {
	if (action.type === SET_IS_LOADING) {
		return {
			...state,
			isLoading: action.isLoading
		};
	}

	return state
}
