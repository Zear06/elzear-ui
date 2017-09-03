import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import './Login.css';
import Quest from '../../quest';
import userState from '../../store/user';
import { api } from '../../constants';

class LoginLocal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      user: null
    };
  }

  setUsername(username) {
    this.setState({ username });
  }

  setPassword(password) {
    this.setState({ password });
  }

  submit() {
    const { username, password } = this.state;

    const quest = new Quest();

    quest.post(`${api}/auth/local/login`, {
      username,
      password
    })
      .then(resp => resp.json())
      .then((resp) => {
        console.log('a', resp);
        // this.setState({ resp });
        userState.loginFromToken(resp.token);
      })
      .catch((e) => {
        console.err('e', e);
      });
  }

  zgetMe() {
    fetch(`${api}me`, {
      // credentials: 'include', //pass cookies, for authentication
      method: 'get',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${this.state.user.token}`
      }
    })
      .then((resp) => {
        resp.json().then((rrr) => {
          console.log('rrr', rrr);
        });
      });
  }

  render() {
    let getMe = null;
    if (this.state.user) {
      getMe = <button onClick={() => this.zgetMe()}>Get ME</button>;
    }

    return (
      <Form onSubmit={() => this.submit()}>
        <Form.Group>
          <Form.Input
            name='username'
            type='text'
            onChange={e => this.setUsername(e.target.value)}
          />
          <Form.Input
            name='username'
            type='text'
            onChange={e => this.setPassword(e.target.value)}
          />
          <Button type='Submit'>Login</Button>
          {getMe}
        </Form.Group>
      </Form>
    );
  }
}

export default LoginLocal;
