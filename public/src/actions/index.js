import axios from 'axios';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
  FETCH_PENALTIES,
} from './types';

const ROOT_URL = 'http://localhost:2017';

export function signinUser(email, password) {
  return function func(dispatch) {
    axios.post(`${ROOT_URL}/public/login`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('access_level', response.data.empl.access_level);
        localStorage.setItem('name', response.data.empl.User.name);
        localStorage.setItem('surname', response.data.empl.User.surname);
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
        localStorage.removeItem('name');
        localStorage.removeItem('surname');
        dispatch({
          type: UNAUTH_USER,
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

export function fetchMessage(route) {
  return function func(dispatch) {
    // submit email password to server
    const url = ROOT_URL + '/private/' + route;
    console.log(url);
    axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err)
        // if request bad, return error to user
        dispatch(authError('Bad login info'));
      });
  };
}

export function fetchPenalties(id) {
  return function func(dispatch) {
    // submit email password to server
    const url = ROOT_URL + '/private/penalty/byUserId/' + id;
    console.log(url);
    axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_PENALTIES,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err)
        // if request bad, return error to user
        dispatch(authError('Bad login info'));
      });
  };
}

export function postPenalties(id, amount, reason) {
  return function func(dispatch) {
    // submit email password to server
    const url = ROOT_URL + '/private/penalty/byUserId/' + id;
    console.log(url);
    axios.post(url, {
      amount, reason,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_PENALTIES,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
        // if request bad, return error to user
        dispatch(authError('not enough access level'));
      });
  };
}

export function deleteEmployee(id) {
  return function func(dispatch) {
    // submit email password to server
    const url = ROOT_URL + '/private/employee/' + id;
    console.log(url);
    axios.delete(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_MESSAGE,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
        // if request bad, return error to user
        dispatch(authError('not enough access level'));
      });
  };
}