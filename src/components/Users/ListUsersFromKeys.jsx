import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import type { User } from '../flowDefs';

type Props = {
  users: Array<User>
};

function listUsersFromKeys(props: Props) {
  const users = props.users.map(user => (
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

export default listUsersFromKeys;
