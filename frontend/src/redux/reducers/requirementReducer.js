import {
  ACTION_CREATE,
  ACTION_UPDATE,
  ACTION_FETCH,
  ACTION_DELETE,
  ACTION_HIDE,
} from "../actions/requirementActions.js";
import axios from "axios";

const initialState = {
  requirements: [],
};

const requirementReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_FETCH:
      return {
        ...state,
        requirements: action.payload.requirements,
      };
    case ACTION_CREATE:
      return {
        ...state,
        requirements: [...state.requirements, action.payload.requirements],
      };
    case ACTION_UPDATE:
      return {
        ...state,
        requirements: state.requirements.map((r) =>
          r.id === action.payload.id
            ? { ...r, finished: action.payload.finished }
            : r
        ),
      };
    case ACTION_HIDE:
      return {
        ...state,
        requirements: state.requirements.filter(
          (req) => req.id !== action.payload.id
        ),
      };
    case ACTION_DELETE:
      axios
        .delete("http://localhost:8080/requirement/", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
          data: {
            id: action.payload.id,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      return {
        ...state,
        requirements: state.requirements.filter(
          (req) => req.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default requirementReducer;
