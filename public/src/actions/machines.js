import axios from 'axios';
import { FETCH_MACHINES } from './types';

const ROOT_URL = 'http://localhost:2017';

export function fetchMachines() {
  return function func(dispatch) {
    // submit email password to server
    const url = `${ROOT_URL}/private/machine/`;
    console.log(url);
    axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_MACHINES,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
        // if request bad, return error to user
        dispatch(authError('Bad login info'));
      });
  };
}

export function fixMachine(id) {
  return function func(dispatch) {
    // submit email password to server
    const url = `${ROOT_URL}/private/machine_fix/${id}`;
    console.log(url);
    axios.post(url, { updates: { is_working: true } }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_MACHINES,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
        // if request bad, return error to user
        dispatch(authError('Bad login info'));
      });
  };
}
