import React, { Component } from 'react';
import { Link } from 'react-router';

class ListGroups extends Component {
  render() {
    const groups = this.props.groups.map(group => (
      <div key={group._key}>
        <Link to={`/groups/${group._key}`}>
          {group.name}
        </Link>
      </div>
    ));
    return (
      <div className='grouplist'>
        {groups}
      </div>
    );
  }
}

export default ListGroups;
