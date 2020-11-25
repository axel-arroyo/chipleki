import { ACTION_CREATE, ACTION_UPDATE, ACTION_FETCH } from '../actions/requirementActions.js';

const initialState = {
	requirements: []
};

const requirementReducer = (state = initialState, action) => {
	switch(action.type) {

		case ACTION_FETCH:
			return {
				...state,
				requirements: action.payload.requirements,
			};
		case ACTION_CREATE:
			return {
				...state,
				requirements: [...state.requirements, action.payload.requirements]
			}
		case ACTION_UPDATE:
			return {
				...state,
				requirements: state.requirements.map((v) => v.id === action.payload.id ? {...v, finished: action.payload.finished} : v)
			}
		default:
			return state;
	}
}

export default requirementReducer;