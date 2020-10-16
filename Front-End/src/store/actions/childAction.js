import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const ADD_CHILD_START = "ADD_CHILD_START";
export const ADD_CHILD_SUCCESS = "ADD_CHILD_SUCCESS";
export const ADD_CHILD_FAILURE = "ADD_CHILD_FAILURE";

// const id = localStorage.getItem('id');

export const addChild = (values, id) => async (dispatch) => {
  dispatch({ type: ADD_CHILD_START });
  await axiosWithAuth()
  .post(`/api/auth/register/${id}`, values)
    .then(res => {
      console.log("add child response", res)
      axiosWithAuth()
      .get(`/api/parent/children/${id}`)
      .then(response => {

        console.log("get children array", response)

      dispatch({ type: ADD_CHILD_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: ADD_CHILD_FAILURE, payload: err });
        console.log(err.response);
      });
    })
    .catch((err) => {
      dispatch({ type: ADD_CHILD_FAILURE, payload: err });
      console.log(err.response);
    });
};