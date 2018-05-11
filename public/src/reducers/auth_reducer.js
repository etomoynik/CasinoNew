import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_PENALTIES,
} from '../actions/types';

export default function (state = {}, action) {
  console.log(action);
  switch (action.type) {
    case AUTH_USER:
      if (!action.payload) {
        console.log('did not recieved answer', action.payload);
        return {
          ...state,
          authenticated: true,
          name: localStorage.getItem('name'),
          surname: localStorage.getItem('surname'),
          access_level: localStorage.getItem('access_level'),
        };
      }

      return {
        ...state,
        authenticated: true,
        name: action.payload.empl.User.name,
        surname: action.payload.empl.User.surname,
        access_level: action.payload.empl.access_level,
      };


    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      console.log('action fetch', action);
      return { ...state, array: action.payload.data };
    case FETCH_PENALTIES:
      console.log('action fetch', action);
      return { ...state, penalties: action.payload.data };
    default:
      return state;
  }
}
