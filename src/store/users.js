import { observable, action } from 'mobx';
import userState from './user'
import { api } from '../constants';

class UsersState {
  @observable users = null;

  @action getUsers() {
    fetch(`${api}/users`, {
      headers: {
        'Authorization': 'Bearer ' + userState.token,
      }
    })
      .then((resp) => {
        resp.json().then((result) => {
          this.users = observable(result.data);
        });
      });
  }
}

export default new UsersState();
