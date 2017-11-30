import React from 'react';
import * as _ from 'lodash';
import { Redirect } from 'react-router';
import userState from './store/user';

const routes: {
  [string]: {
    show: (?string) => boolean,
    to: string,
    children: string,
    onClick?: () => void
  }
} = {
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
    onClick: () => userState.setToken(null),
    to: '/',
    children: 'Logout'
  }
};

const redirectLogin = <Redirect to='/login' />;

function isAuth(): boolean {
  return userState.token !== null;
}

function id2key(id: string): string {
  return id.split('/')[1];
}

export {
  routes,
  redirectLogin,
  isAuth,
  id2key
};
