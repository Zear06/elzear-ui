import { action, observable } from 'mobx';
import userState from './user';
import { api } from '../constants';

class GroupState {
  @observable groups = null;

  @action
  getGroups() {
    fetch(`${api}/groups`, {
      headers: {
        Authorization: `Bearer ${userState.token}`,
      }
    })
      .then((resp) => {
        resp.json().then((result) => {
          this.groups = observable(result.data);
        });
      });
  }
}

export default new GroupState();
