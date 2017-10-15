import { action, observable } from 'mobx';
import { client } from '../ApolloSetup';

function initToken() : ?string {
  const str = window.localStorage.getItem('token');
  if (!str || str === '' || str === 'null') {
    return null;
  }
  return str;
}

class UserState {
  @observable token: ?string = initToken();

  @action
  setToken(token: ?string) {
    this.setTokenNoreset(token);
    client.resetStore();
  }

  @action
  setTokenNoreset(token: ?string) {
    window.localStorage.setItem('token', '');
    window.localStorage.setItem('token', token);
    this.token = token;
  }

  getToken(): ?string {
    return this.token;
  }
}

const userState = new UserState();

export default userState;
