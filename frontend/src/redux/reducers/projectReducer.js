import { ACTION_CREATE, ACTION_UPDATE, ACTION_FETCH } from '../actions/projectActions.js';

const initialState = {
	projects: []
};

const projectReducer = (state = initialState, action) => {
	switch(action.type) {

		case ACTION_FETCH:
			return {
				...state,
				projects: action.payload.projects,
			};
		case ACTION_CREATE:
			return {
				...state,
				projects: [...state.projects, action.payload.projects]
			}
		case ACTION_UPDATE:
			return {
				...state,
				projects: state.projects.map(p => p.id === action.payload.id ? {...p, finished: action.payload.finished} : p)
			}
		default:
			return state;
	}
}

export default projectReducer;