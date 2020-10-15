import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNUP_USER_START,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from "../actions/userAction";

export const initialState = {
  error: "",
  isFetching: false,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
      case SIGNUP_USER_START:
        return {
          ...state,
          isFetching: true,
        };
      case SIGNUP_USER_SUCCESS:
        return {
          ...state,
          isFetching: false,
          user: action.payload,
        };
      case SIGNUP_USER_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };
    default:
      return state;
  }
};