import { FETCH_GAMES, FETCH_GAME_MACHINES } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_GAMES:
      console.log('action fetch', action);
      return { ...state, games: action.payload.data };
    case FETCH_GAME_MACHINES:
      console.log('action fetch', action);
      return { ...state, machines: action.payload.data };
    default:
      return state;
  }
}