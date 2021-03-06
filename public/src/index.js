import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Router, Route, IndexRoute, browserHistory } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Home from './components/Home';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Register from './components/auth/register';
import Employees from './components/Employees';
import Games from './components/Games';
import Players from './components/Players';
import Machines from './components/Machines';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import About from './components/About';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import login from './components/auth/login';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <div>
        <Route exact path="/" component={RequireAuth(Home)}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/register" component={Register}/>
        <Route path="/employees" component={RequireAuth(Employees)}/>
        <Route path="/machines" component={RequireAuth(Machines)}/>
        <Route path="/players" component={RequireAuth(Players)}/>
        <Route path="/games" component={RequireAuth(Games)}/>
        <Route path="/home" component={RequireAuth(Home)}/>
        <Route path="/about" component={RequireAuth(About)}/>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));