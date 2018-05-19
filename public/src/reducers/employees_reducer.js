import {
  FETCH_EMPLOYEES,
  FETCH_PENALTIES,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      console.log('action fetch', action);
      return { ...state, employees: action.payload.data };
    case FETCH_PENALTIES:
      console.log('action fetch', action);
      return { ...state, penalties: action.payload.data };
    default:
      return state;
  }
}

