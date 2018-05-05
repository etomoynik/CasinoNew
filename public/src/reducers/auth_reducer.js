import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from '../actions/types';

export default function (state = {}, action) {
  console.log(action);
  switch (action.type) {
    case AUTH_USER:
      console.log('resp data', action.payload);
      if (!action.payload) {
        return {
          ...state,
          authenticated: true,
          // name: action.payload.data.empl.User.name,
          // surname: action.payload.data.User.empl.surname,
          // access_level: action.payload.data.empl.access_level,
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
      console.log('action', action);
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
