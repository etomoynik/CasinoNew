import axios from 'axios';
import { FETCH_GAMES } from './types';

const ROOT_URL = 'http://localhost:2017';

export function fetchGames() {
  return function func(dispatch) {
    // submit email password to server
    const url = `${ROOT_URL}/private/game/`;
    console.log(url);
    axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(response => {
        console.log('action creator', response);
        dispatch({
          type: FETCH_GAMES,
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

export function patchGame(id, chance) {
  return function func(dispatch) {
    // submit email password to server
    const url = `${ROOT_URL}/private/game/patch/${id}`;
    console.log(url);
    axios.post(
      url, { chance },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    )
      .then(response => {
        console.log('action creator', response);
      })
      .catch((err) => {
        console.log(err);
        // if request bad, return error to user
        dispatch(authError('Bad login info'));
      });
  };
}
