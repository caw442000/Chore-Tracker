import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const ADD_CHILD_START = "ADD_CHILD_START";
export const ADD_CHILD_SUCCESS = "ADD_CHILD_SUCCESS";
export const ADD_CHILD_FAILURE = "ADD_CHILD_FAILURE";

export const SET_CHILDREN_START = "SET_CHILDREN_START";
export const SET_CHILDREN_SUCCESS = "SET_CHILDREN_SUCCESS";
export const SET_CHILDREN_FAILURE = "SET_CHILDREN_FAILURE";
export const RESET_CHILDREN_SUCCESS = "RESET_CHILDREN_SUCCESS";

const id = localStorage.getItem('id');

export const addChild = (values) => async (dispatch) => {
  dispatch({ type: ADD_CHILD_START });
  await axiosWithAuth()
  .post(`/api/auth/register/${id}`, values)
    .then(res => {
      dispatch({ type: ADD_CHILD_SUCCESS, payload: res.data });

    })
    .catch((err) => {
      dispatch({ type: ADD_CHILD_FAILURE, payload: err });
      console.log(err.response);
    });
};

export const setChildren = () => async (dispatch) => {
  dispatch({ type: SET_CHILDREN_START });
  await axiosWithAuth()
      .get(`/api/parent/children/${id}`)
      .then(response => {

        console.log("get children array", response)

      dispatch({ type: SET_CHILDREN_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: SET_CHILDREN_FAILURE, payload: err });
        console.log(err.response);
      });
};

export const resetChildren = () => async (dispatch) => {
      dispatch({ type: RESET_CHILDREN_SUCCESS});
};