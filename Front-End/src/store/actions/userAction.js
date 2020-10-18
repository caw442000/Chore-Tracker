// import { useHistory } from "react-router";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

import { setChildren } from './index'
export const RESET_USER_SUCCESS = "RESET_USER_SUCCESS"

export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const SIGNUP_USER_START = "SIGNUP_USER_START";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS";
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";

export const loginUser = (values) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_START });
  await axiosWithAuth()
    .post("/api/auth/login", values)
    .then(async(res) => {
      console.log("this is res", res)
      const id = await res.data.id

      // console.log("this is id going to be returned", id)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
   
      
    })
    .catch((err) => {
      dispatch({ type: LOGIN_USER_FAILURE, payload: err });
      console.log(err.response);
    });
};

export const signUpUser = (values) => async (dispatch) => {
  dispatch({ type: SIGNUP_USER_START });
  await axiosWithAuth()
    .post("/api/auth/register", values)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      dispatch({ type: SIGNUP_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SIGNUP_USER_FAILURE, payload: err });
      console.log(err.response);
    });
};


export const resetUser = () => async (dispatch) => {
  dispatch ({ type: RESET_USER_SUCCESS })
}
