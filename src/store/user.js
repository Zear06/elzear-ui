import { action, observable } from 'mobx';
import { client } from '../ApolloSetup';

function initToken() {
  const str = window.localStorage.getItem('token');
  if (!str || str === '' || str === 'null') {
    return null;
  }
  return str;
}

class UserState {
  @observable token = initToken();

  @action
  setToken(token) {
    this.setTokenNoreset(token);
    client.resetStore();
  }

  @action
  setTokenNoreset(token) {
    window.localStorage.setItem('token', '');
    window.localStorage.setItem('token', token);
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}

const userState = new UserState();

export default userState;
