import axios from 'axios';
import { FETCH_PLAYERS } from './types';

const ROOT_URL = 'http://localhost:2017';

export function fetchPlayers() {
  return function func(dispatch) {
    // submit email password to server
    const url = `${ROOT_URL}/private/visitor/`;
    console.log(url);
    axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_PLAYERS,
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
