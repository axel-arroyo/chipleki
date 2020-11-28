import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer.js';
import projectReducer from './reducers/projectReducer.js';
import requirementReducer from './reducers/requirementReducer.js';
import userReducer from './reducers/userReducer.js';

const appReducer = combineReducers({
	authReducer: authReducer,
	requirementReducer: requirementReducer,
	projectReducer: projectReducer,
	userReducer: userReducer,
});

export default createStore(appReducer);