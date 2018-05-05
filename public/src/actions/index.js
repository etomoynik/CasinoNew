import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
} from './types';

const ROOT_URL = 'http://localhost:2017';

export function signinUser(email, password) {
  return function func(dispatch) {
    axios.post(`${ROOT_URL}/public/login`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        console.log(localStorage.getItem('token'));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authError('Bad login info'));
      });
  };
}

export function signupUser(email, password, password2, date, name, surname) {
  return function func(dispatch) {
    // submit email password to server
    axios.post(`${ROOT_URL}/public/register`, {
      email, password, password2, date, name, surname,
    })
      .then(response => {
        // if req is good, update state to indicate authentication
        dispatch({ type: AUTH_USER });
        // save jwt token
        localStorage.setItem('token', response.data.token);
        // redirect to the route /feature

        // browserHistory.push('/private/users');
      })
      .catch(error => {
        // if request bad, return error to user
        console.log(error)
        console.log('error', error.response.data.msg);
        dispatch(authError(error.response.data.msg));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}
export function logoutUser() {
  return function func(dispatch) {
    axios.get(`${ROOT_URL}/private/logout`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response.data.message);
        localStorage.removeItem('token');
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        });
      })
      .catch((err) => {
      // if request bad, return error to user
        dispatch(authError('Bad login info'));
      });
    return {
      type: UNAUTH_USER,
    };
  };
}

export function fetchMessage() {
  return function func(dispatch) {
    // submit email password to server
    axios.get(`${ROOT_URL}/private/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response.data.message);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message,
        });
      })
      .catch((err) => {
        // if request bad, return error to user
        dispatch(authError('Bad login info'));
      });
  };
}
