import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import './Login.css';
import userState from '../../store/user';

type Props = {};
type State = {
  username: string,
  password: string
};

class SignupLocal extends Component<Props, State> {
  state = {
    username: '',
    password: ''
  };

  setUsername(username: string) {
    this.setState({ username });
  }

  setPassword(password: string) {
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
        userState.setToken(resp.token);
      });
  }

  render() {
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
      </div>
    );
  }
}

export default SignupLocal;
