import {
  ADD_CHILD_START,
  ADD_CHILD_SUCCESS,
  ADD_CHILD_FAILURE,

} from "../actions/childAction";

export const initialState = {
  error: "",
  isFetching: false,
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
        children: action.payload,
      };
    case ADD_CHILD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
