// @flow
import React from 'react';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import App from './components/App/App';
// import About from './client/components/About';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Profile from './components/Profile/Profile';
import Users from './components/Users/Users';
import Groups from './components/Groups/Groups';
import Welcome from './components/App/Welcome';
import userState from './store/user';

// import NotFound from './client/components/NotFound';

function ensureAuth(nextState, replace) {
  if (userState.user === null) {
    replace('/login');
  }
}

const Routes = props => (
  <Router {...props} history={hashHistory}>
    <Route {...props} history={hashHistory} path='/' component={App}>
      <IndexRoute {...props} history={hashHistory} component={Welcome} />
      <Route {...props} history={hashHistory} path='/login' component={Login} />
      <Route {...props} history={hashHistory} path='/signup' component={Signup} />
      <Route {...props} history={hashHistory} path='/profile' component={Profile} onEnter={ensureAuth} />
      <Route {...props} history={hashHistory} path='/groups' component={Groups} onEnter={ensureAuth} />
      <Route {...props} history={hashHistory} path='/users' component={Users} onEnter={ensureAuth} />
    </Route>
    {/* */}
    {/* <Route path="/about" component={About} /> */}
    {/* <Route path="*" component={NotFound} /> */}
  </Router>
);

export default Routes;
