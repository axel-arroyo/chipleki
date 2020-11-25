import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer.js';
import projectReducer from './reducers/projectReducer.js';
import requirementReducer from './reducers/requirementReducer.js';

const appReducer = combineReducers({
	authReducer: authReducer,
	requirementReducer: requirementReducer,
	projectReducer: projectReducer,
});

export default createStore(appReducer);