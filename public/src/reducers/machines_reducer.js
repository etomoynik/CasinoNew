import { FETCH_MACHINES } from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_MACHINES:
      console.log('action fetch', action);
      return { ...state, machines: action.payload.data };
    default:
      return state;
  }
}