import React from 'react';
import * as _ from 'lodash';
import { Redirect } from 'react-router';
import userState from './store/user';

const routes = {
  login: {
    show: _.isNull,
    to: '/login',
    children: 'Login'
  },
  profile: {
    show: _.negate(_.isNull),
    to: '/profile',
    children: 'Profile'
  },
  groups: {
    show: _.negate(_.isNull),
    to: '/groups',
    children: 'Groups'
  },
  users: {
    show: _.negate(_.isNull),
    to: '/users',
    children: 'Users'
  },
  logout: {
    show: _.negate(_.isNull),
    onClick: () => userState.logout(),
    to: '/',
    children: 'Logout'
  }
};

const redirectLogin = <Redirect to='/login' />;

function isAuth() {
  return userState.user !== null;
}

export {
  routes,
  redirectLogin,
  isAuth
};
