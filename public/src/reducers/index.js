import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import employeesReducer from './employees_reducer';
import machinesReducer from './machines_reducer';
import gamesReducer from './games_reducer';
import playersReducer from './players_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  employees: employeesReducer,
  games: gamesReducer,
  players: playersReducer,
  machines: machinesReducer,
});

export default rootReducer;
