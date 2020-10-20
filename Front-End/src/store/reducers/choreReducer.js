import {
  ADD_CHORE_START,
  ADD_CHORE_SUCCESS,
  ADD_CHORE_FAILURE,
  SET_CHORES_START,
  SET_CHORES_SUCCESS,
  SET_CHORES_FAILURE,
  RESET_CHORES_SUCCESS,
} from "../actions/choreAction";

export const initialState = {
  error: "",
  isFetching: false,
  isFetchingChores: false,
  chores: [],
};

export const choreReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHORE_START:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_CHORE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
      };

    case ADD_CHORE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case SET_CHORES_START:
      return {
        ...state,
        isFetchingChores: true,
      };
    case SET_CHORES_SUCCESS:
      return {
        ...state,
        isFetchingChores: false,
        chores: action.payload,
        error: "",
      };

      case SET_CHORES_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };

    case RESET_CHORES_SUCCESS:
      return {
        error: "",
        isFetching: false,
        isFetchingChores: false,
        chores: [],
      };
    default:
      return state;
  }
};
