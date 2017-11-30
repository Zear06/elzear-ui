import React from 'react';
import type { Node } from 'react';
import { Switch, Route } from 'react-router-dom';
import queryString from 'query-string';
import { Container } from 'semantic-ui-react';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';
import userState from '../../store/user';
import Header from './Header';

import Login from '../Login/Login';
import Keattis from '../Keattis/Keattis';
import Signup from '../Login/Signup';
import Profile from '../Profile/Profile';
import Users from '../Users/Users';
import Groups from '../Groups/Groups';
import Welcome from '../App/Welcome';
import Group from '../Groups/Group';
import User from '../Users/User';
import Poll from '../Poll/Poll';
import type { routedType } from '../flowDefs';

function ensureAuth(nextState, replace) {
  if (userState.token === null) {
    replace('/login');
  }
}

type Props = { children?: Node } & routedType;

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    const parsed = queryString.parse(props.location.search);
    if (parsed.token) {
      userState.setToken(parsed.token);
    }
  }

  render() {
    const props = this.props;
    const error = null;
    return (
      <div className='elzear-app'>
        <Header />
        <Sidebar />
        <Container className='elzear-body'>
          {error}
          {this.props.children}
          <Switch>
            <Route {...props} exact path='/' component={Welcome} />
            <Route {...props} path='/login' component={Login} />
            <Route {...props} path='/keattis' component={Keattis} />
            <Route {...props} path='/signup' component={Signup} />
            <Route {...props} path='/profile' component={Profile} onEnter={ensureAuth} />
            <Route
              path='/groups/:groupKey'
              onEnter={ensureAuth}
              component={Group}
            />
            <Route {...props} path='/groups' onEnter={ensureAuth}>
              <Route {...props} path='/' component={Groups} />
            </Route>
            <Route {...props} path='/users/:userKey' component={User} onEnter={ensureAuth} />
            <Route {...props} path='/users' component={Users} onEnter={ensureAuth} />
            <Route {...props} path='/polls/:pollKey' component={Poll} onEnter={ensureAuth} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
