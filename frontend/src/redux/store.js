import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer.js';
import projectReducer from './reducers/projectReducer.js';

const appReducer = combineReducers({
	authReducer: authReducer,
	projectReducer: projectReducer,
});

export default createStore(appReducer);