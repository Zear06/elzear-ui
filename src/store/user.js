import { action, observable } from 'mobx';

class UserState {
  @observable token = null;

  @action
  setToken(token) {
    // client.resetStore();
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}

const userState = new UserState();

export default userState;
