import { ACTION_CREATE, ACTION_FETCH } from "../actions/commentActions.js";

const initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_FETCH:
      return {
        ...state,
        comments: action.payload.comments,
      };
    case ACTION_CREATE:
      return {
        ...state,
        comments: [...state.comments, action.payload.comments],
      };
    default:
      return state;
  }
};

export default commentReducer;
