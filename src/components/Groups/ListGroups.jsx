import React from 'react';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';

type Group = {
  _key: string,
  name: string
};

type Props = {
  groups: Array<Group>
};

function ListGroups(props: Props) {
  const groups = props.groups.map(group => (
    <List.Item key={group._key}>
      <List.Content>
        <List.Header
          as={Link}
          to={`/groups/${group._key}`}
        >
          {group.name}
        </List.Header>
      </List.Content>
    </List.Item>
  ));
  return (
    <List relaxed className='grouplist'>
      {groups}
    </List>
  );
}

export default ListGroups;
