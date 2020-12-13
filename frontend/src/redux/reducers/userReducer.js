import { ACTION_FETCH } from '../actions/requirementActions.js';

const initialState = {
	users: []
};

const userReducer = (state = initialState, action) => {
	switch(action.type) {
		case ACTION_FETCH:
			return {
				...state,
				users: action.payload.users,
			};
		default:
			return state;
	}
}

export default userReducer;