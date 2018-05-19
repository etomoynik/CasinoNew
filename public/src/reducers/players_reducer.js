import { FETCH_PLAYERS } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PLAYERS:
      console.log('action fetch', action);
      return { ...state, players: action.payload.data };
    default:
      return state;
  }
}