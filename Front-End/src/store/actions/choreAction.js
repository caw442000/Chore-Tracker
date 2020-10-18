import { axiosWithAuth } from "../../utils/axiosWithAuth";

export const ADD_CHORE_START = "ADD_CHORE_START";
export const ADD_CHORE_SUCCESS = "ADD_CHORE_SUCCESS";
export const ADD_CHORE_FAILURE = "ADD_CHORE_FAILURE";

export const SET_CHORES_START = "SET_CHORES_START";
export const SET_CHORES_SUCCESS = "SET_CHORES_SUCCESS";
export const SET_CHORES_FAILURE = "SET_CHORES_FAILURE";
export const RESET_CHORES_SUCCESS = "RESET_CHORES_SUCCESS"


// const id = localStorage.getItem('id');

export const addChore = (chores, id) => async (dispatch) => {
  dispatch({ type: ADD_CHORE_START });
  await axiosWithAuth()
  .post(`/api/chores/${id}`, chores)
    .then(res => {
      dispatch({ type: ADD_CHORE_SUCCESS, payload: res.data });

    })
    .catch((err) => {
      dispatch({ type: ADD_CHORE_FAILURE, payload: err });
      console.log(err.response);
    });
};

export const setChores = (id) => async (dispatch) => {

  console.log("this is the id going to set CHORES", id)
  dispatch({ type: SET_CHORES_START });
  await axiosWithAuth()
      .get(`/api/chores/${id}`)
      .then(response => {

        console.log("get CHORES array", response)

      dispatch({ type: SET_CHORES_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: SET_CHORES_FAILURE, payload: err });
        console.log(err.response);
      });
};

export const resetChores = () => async (dispatch) => {
  dispatch ({ type: RESET_CHORES_SUCCESS })
}