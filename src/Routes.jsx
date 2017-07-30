// @flow
import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App/App';
// import About from './client/components/About';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Profile from './components/Profile/Profile';
// import NotFound from './client/components/NotFound';

const Routes = props => (
  <Router {...props} history={hashHistory}>
    <Route {...props} history={hashHistory} path='/' component={App}>
      <Route {...props} history={hashHistory} path='/login' component={Login} />
      <Route {...props} history={hashHistory} path='/signup' component={Signup} />
      <Route {...props} history={hashHistory} path='/profile' component={Profile} />
    </Route>
    { /* */ }
    { /* <Route path="/about" component={About} />*/ }
    { /* <Route path="*" component={NotFound} />*/ }
  </Router>
);

export default Routes;
