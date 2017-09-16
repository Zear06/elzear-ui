import React, { Component } from 'react';
import { Link } from 'react-router';
import { List } from 'semantic-ui-react';

class ListUsersFromKeys extends Component {
  render() {
    const users = this.props.users.map(user => (
      <List.Item key={user._key}>
        <List.Content>
          <List.Header
            as={Link}
            to={`/users/${user._key}`}
          >
            {user.name}
          </List.Header>
        </List.Content>
      </List.Item>
    ));
    return (
      <List className='userlist'>
        {users}
      </List>
    );
  }
}

export default ListUsersFromKeys;
