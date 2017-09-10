import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Quest from '../../quest';
import userState from '../../store/user';
import { api } from '../../constants';

class AddAuthLocal extends Component {
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
    const quest = new Quest(userState.token);
    quest.post(`${api}/auth/local/add`, {
      username,
      password
    })
      .then(resp => resp.json())
      .then((resp) => {
        userState.setToken(resp.token);
        this.props.refetch();
        // browserHistory.push('/profile');
      })
      .catch((e) => {
        console.error('e', e);
      });
  }

  render() {
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
          <Button type='Submit'>AddLocal</Button>
        </Form.Group>
      </Form>
    );
  }
}

export default AddAuthLocal;
