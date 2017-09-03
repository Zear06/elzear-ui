import { observable, action } from 'mobx';
import jwtDecode from 'jwt-decode';

class UserState {
  @observable user = null;
  token = null;

  @action loginFromToken(token) {
    this.user = jwtDecode(token);
    this.token = token;
  }

  @action login(resp) {
    this.user = resp.user;
    this.token = resp.token;
  }

  @action logout() {
    this.user = null;
    this.token = null;
  }
}
const userState = new UserState();

export default userState;
