import React, { Component } from 'react';
import { Link } from 'react-router';
import { List } from 'semantic-ui-react';

class ListGroups extends Component {
  render() {
    const groups = this.props.groups.map(group => (
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
}

export default ListGroups;
