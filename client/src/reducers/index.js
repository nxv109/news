import { combineReducers } from "redux";

import userReducer from "./user.reducer";

const allReducers = combineReducers({
	users: userReducer
});

export default allReducers;