import {axiosWithAuth} from '../../utils/axiosWithAuth';

export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const getUser = (values) => dispatch => {
  dispatch ({ type: LOGIN_USER_START });
  axiosWithAuth().post("api/auth/login", values)
  .then(res => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data })
  })
  .catch(err => {
    dispatch({type: LOGIN_USER_FAILURE, payload: err})
    console.log(err.response)
  })

};