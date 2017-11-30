import React, { Component } from 'react';
import { Button, Dropdown, Form, Header, Input, Label, List, Menu, Modal, TextArea } from 'semantic-ui-react';
import type { OptionProps } from 'react-apollo';
import { graphql } from 'react-apollo';
import './Groups.css';
import { isAuth, redirectLogin } from '../../utils';
import SUBMIT_GROUP from '../../graphql/GroupSubmit.graphql';
import { validGroupTypes } from '../../constants';

const ranks = [
  'anonym',
  'user',
  'member',
  'admin',
  'noone'
];
// const ranks = {
//   0: 'anonym',
//   1: 'user',
//   2: 'member',
//   3: 'admin',
//   4: 'noone'
// };
const possibleActions = {
  list: [0, 1, 2],
  read: [0, 1, 2],
  // rqst: [1, 2],
  acpt: [1, 2, 3],
  // invt: [1, 2, 3],
  edit: [2, 3, 4],
  // revo: [3, 4]
};

type Props = OptionProps;
type State = {
  name: string,
  description: string,
  type: string,
  actions: { [string]: number }
};

@graphql(SUBMIT_GROUP)
class AddGroup extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      type: validGroupTypes[0],
      actions: {}
    };

    Object.keys(possibleActions)
      .forEach((action) => {
        this.state.actions[action] = possibleActions[action][0];
      });
  }

  setName(name: string) {
    this.setState({ name });
  }

  setDescription(description: string) {
    this.setState({ description });
  }

  submit() {
    const { name, description, type } = this.state;
    const actions = {};
    Object.keys(possibleActions).forEach((action) => {
      actions[action] = this.state.actions[action];
    });

    this.props.mutate({
      variables: {
        name, description, type, ...actions
      }
    })
      .then(() => {
        this.props.refetch();
      });
  }

  render() {
    if (!isAuth()) {
      return redirectLogin;
    }
    const dropdownItems = validGroupTypes.map(type => (
      <Dropdown.Item
        key={type}
        text={type}
        value={type}
        onClick={() => this.setState({ type })}
      />
    ));

    const rights = Object.keys(possibleActions).map(action => (
      <List.Item key={action}>
        <Label>{action}</Label>
        <Menu
          compact
          label={`Group action ${action}`}
          key={action}
        >
          <Dropdown
            item
            text={ranks[this.state.actions[action]]}
            value={this.state.actions[action]}
          >
            <Dropdown.Menu>
              {possibleActions[action].map(rank => (
                <Dropdown.Item
                  key={rank}
                  text={ranks[rank]}
                  value={rank}
                  onClick={() => this.setState({ [action]: rank })}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      </List.Item>
    ));

    return (
      <Modal trigger={<Button>Show Modal</Button>}>
        <Modal.Header>Create a new group</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form onSubmit={() => this.submit()} className='groups-add'>
              <Input
                label='Group name'
                name='name'
                value={this.state.name}
                type='text'
                onChange={e => this.setName(e.target.value)}
              />
              <TextArea
                rows={5}
                label='Group description'
                name='description'
                value={this.state.description}
                type='text'
                onChange={e => this.setDescription(e.target.value)}
              />

              <Header>Group type</Header>
              <Menu compact label='Group type'>
                <Dropdown
                  item
                  text={this.state.type}
                  value={this.state.type}
                >
                  <Dropdown.Menu>
                    {dropdownItems}
                  </Dropdown.Menu>
                </Dropdown>
              </Menu>
              <Header>Minimal status to perform actions</Header>
              <List>
                {rights}
              </List>
              <Button type='Submit'>Add Group</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddGroup;
