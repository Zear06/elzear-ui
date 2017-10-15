import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List } from 'semantic-ui-react';
import { profilePicUrl } from './utils';
import type { User } from '../flowDefs';

type Props = {
  users: Array<User>
}

function listUsers(props: Props) {
  const users = props.users.map(user => (
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

export default listUsers;
