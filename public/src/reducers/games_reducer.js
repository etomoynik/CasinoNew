import { FETCH_GAMES } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_GAMES:
      console.log('action fetch', action);
      return { ...state, games: action.payload.data };
    default:
      return state;
  }
}