import axios from 'axios';
import {
  FETCH_EMPLOYEES,
  FETCH_PENALTIES,
  EMPLOYEES_ERROR,
} from './types';

const ROOT_URL = 'http://localhost:2017';

export function employeesError(error) {
  return {
    type: EMPLOYEES_ERROR,
    payload: error,
  };
}

export function fetchEmployees() {
  return function func(dispatch) {
    const url = `${ROOT_URL}/private/employee`;
    axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_EMPLOYEES,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
        // if request bad, return error to user
        dispatch(employeesError('Bad login info'));
      });
  };
}

export function fetchPenalties(id) {
  return function func(dispatch) {
    // submit email password to server
    const url = `${ROOT_URL}/private/penalty/byUserId/${id}`;
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
        console.log(err);
        // if request bad, return error to user
        dispatch(employeesError('Bad login info'));
      });
  };
}

export function postPenalties(id, amount, reason) {
  return function func(dispatch) {
    // submit email password to server
    const url = `${ROOT_URL}/private/penalty/byUserId/${id}`;
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
        dispatch(employeesError('not enough access level'));
      });
  };
}

export function deleteEmployee(id) {
  return function func(dispatch) {
    // submit email password to server
    const url = `${ROOT_URL}/private/employee/${id}`;
    console.log(url);
    axios.delete(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_EMPLOYEES,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
        // if request bad, return error to user
        dispatch(employeesError('not enough access level'));
      });
  };
}

