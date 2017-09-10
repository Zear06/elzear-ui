import React, { Component } from 'react';
import { Button, Dropdown, Form, Input, TextArea } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import './Groups.css';
import { isAuth, redirectLogin } from '../../utils';

import SUBMIT_GROUP from '../../graphql/GroupSubmit.graphql';
import { validGroupTypes } from '../../constants';

@graphql(SUBMIT_GROUP)
class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      type: validGroupTypes[0]
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
    this.props.mutate({ variables: { name, description } })
      .then(() => {
        this.props.refetch();
      });
  }

  render() {
    if (!isAuth()) {
      return redirectLogin;
    }
    const dropdownItems = validGroupTypes.map(
      type => (<Dropdown.Item
        key={type}
        text={type}
        value={type}
        onClick={() => this.setState({ type })}
      />)
    );
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
        <Dropdown
          text={this.state.type}
          value={this.state.type}
        >
          <Dropdown.Menu>
            {dropdownItems}
          </Dropdown.Menu>
        </Dropdown>
        <Button type='Submit'>Add Group</Button>
      </Form>
    );
  }
}

export default AddGroup;
