// @flow
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import App from './components/App/App';
// import About from './client/components/About';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Profile from './components/Profile/Profile';
import Users from './components/Users/Users';
import Groups from './components/Groups/Groups';
import Welcome from './components/App/Welcome';
import Group from './components/Groups/Group';
import User from './components/Users/User';
import { client, store } from './ApolloSetup';
import userState from './store/user';

// import NotFound from './client/components/NotFound';

function ensureAuth(nextState, replace) {
  if (userState.token === null) {
    replace('/login');
  }
}

const Routes = props => (
  <ApolloProvider client={client} store={store}>
    <Router {...props} history={browserHistory}>
      <Route {...props} history={browserHistory} path='/' component={App}>
        <IndexRoute {...props} history={browserHistory} component={Welcome} />
        <Route {...props} history={browserHistory} path='/login' component={Login} />
        <Route {...props} history={browserHistory} path='/signup' component={Signup} />
        <Route {...props} history={browserHistory} path='/profile' component={Profile} onEnter={ensureAuth} />
        <Route {...props} history={browserHistory} path='/groups/:groupKey' onEnter={ensureAuth} component={Group} />
        <Route {...props} history={browserHistory} path='/groups' onEnter={ensureAuth}>
          <IndexRoute {...props} history={browserHistory} component={Groups} />
        </Route>
        <Route {...props} history={browserHistory} path='/users' component={Users} onEnter={ensureAuth} />
        <Route {...props} history={browserHistory} path='/users/:userKey' component={User} onEnter={ensureAuth} />
      </Route>
      {/* */}
      {/* <Route path="/about" component={About} /> */}
      {/* <Route path="*" component={NotFound} /> */}
    </Router>
  </ApolloProvider>
);

export default Routes;
