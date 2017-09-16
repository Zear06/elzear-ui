import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Button, Form, Message } from 'semantic-ui-react';
import './Login.css';
import Quest from '../../quest';
import userState from '../../store/user';
import { api } from '../../constants';

class LoginLocal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
        userState.setToken(resp.token);
        browserHistory.push('/profile');
      })
      .catch((e) => {
        this.setState({ error: e.message });
      });
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = (<Message>
        <Message.Header>Error</Message.Header>
        <span style={{ whiteSpace: 'pre-line' }}>{this.state.error}</span>
      </Message>);
    }
    return (
      <Form onSubmit={() => this.submit()}>
        {error}
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
        </Form.Group>
      </Form>
    );
  }
}

export default LoginLocal;
