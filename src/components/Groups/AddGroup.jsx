import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';
import './Groups.css';
import { isAuth, redirectLogin } from '../../utils';
import userState from '../../store/user';
import { api } from '../../constants';
import Quest from '../../quest';

@observer
class AddGroup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: ''
    };
  }

  setName(name) {
    this.setState({ name });
  }

  setDescription(description) {
    this.setState({ description });
  }

  submit() {
    const { name, description } = this.state;

    const quest = new Quest(userState.token);

    quest.post(`${api}/groups`, {
      name,
      description,
      type: 'oligarchy'
    })
      .then(resp => resp.json())
      .then((resp) => {
        console.log('a', resp);
        // this.setState({ resp });
      })
      .catch((e) => {
        console.err('e', e);
      });
  }

  render() {
    if (!isAuth()) {
      return redirectLogin;
    }
    return (
      <Form onSubmit={() => this.submit()} className='groups-add'>
        <Input
          name='username'
          type='text'
          onChange={e => this.setName(e.target.value)}
        />
        <TextArea
          name='description'
          type='text'
          onChange={e => this.setDescription(e.target.value)}
        />
        <Button type='Submit'>Add Group</Button>
      </Form>
    );
  }
}

export default AddGroup;
