import {
  ADD_CHILD_START,
  ADD_CHILD_SUCCESS,
  ADD_CHILD_FAILURE,
  SET_CHILDREN_START,
  SET_CHILDREN_SUCCESS,
  SET_CHILDREN_FAILURE,
  RESET_CHILDREN_SUCCESS,
} from "../actions/childAction";

export const initialState = {
  error: "",
  isFetching: false,
  isFetchingChildren: false,
  children: [],
};

export const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHILD_START:
      return {
        ...state,
        isFetching: true,
      };
    case ADD_CHILD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
      };

    case ADD_CHILD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case SET_CHILDREN_START:
      return {
        ...state,
        isFetchingChildren: true,
      };
    case SET_CHILDREN_SUCCESS:
      return {
        ...state,
        isFetchingChildren: false,
        children: action.payload,
        error: "",
      };

      case SET_CHILDREN_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };

    case RESET_CHILDREN_SUCCESS:
      return {
        error: "",
        isFetching: false,
        isFetchingChildren: false,
        children: [],
      };
    default:
      return state;
  }
};
