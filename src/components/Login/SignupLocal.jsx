import React, { Component } from 'react';
import './Login.css';
import userState from '../../store/user';
import { Button, Input } from 'semantic-ui-react';

class SignupLocal extends Component {

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
    fetch('http://localhost:3001/auth/local/register', {
      // credentials: 'include', //pass cookies, for authentication
      method: 'post',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(resp => resp.json())
      .then((resp) => {
        console.log('a', resp);
        this.setState({ resp });
        userState.login(resp);
      });
  }

  zgetMe() {
    fetch('http://localhost:3001/me', {
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
    console.log('this.state.user', this.state.user);

    let getMe = null;
    if (this.state.user) {
      getMe = <button onClick={() => this.zgetMe()}>Get ME</button>;
    }

    return (
      <div className='login-local'>
        <Input
          name='username'
          type='text'
          onChange={e => this.setUsername(e.target.value)}
        />
        <Input
          name='username'
          type='text'
          onChange={e => this.setPassword(e.target.value)}
        />
        <Button onClick={() => this.submit()}>Signup</Button>
        {getMe}
      </div>
    );
  }
}

export default SignupLocal;
