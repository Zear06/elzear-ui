import React, { Component } from 'react';
import { Link } from 'react-router';
import { Image, List } from 'semantic-ui-react';
import { profilePicUrl } from './utils';

class ListUsers extends Component {
  render() {
    const users = this.props.users.map(user => (
      <List.Item key={user._key}>
        <Image avatar src={profilePicUrl(user)} />
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

export default ListUsers;
