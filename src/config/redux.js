import {
	createStore,
	combineReducers
} from 'redux'

import user from "../reducers/user";
import load from "../reducers/loading";

export default createStore(combineReducers({
	user,
	load
}));
