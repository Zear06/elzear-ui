import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Groups.css';
import groupState from '../../store/groups';
import { isAuth, redirectLogin } from '../../utils';
import AddGroup from './AddGroup';

const NO_GROUPS = (<div>No groups</div>);

@observer
class Groups extends Component {
  constructor() {
    super();
    groupState.getGroups();
  }

  render() {
    if (!isAuth()) {
      return redirectLogin;
    }
    if (groupState.groups === null) {
      return <div>NULL</div>;
    }
    const groups = groupState.groups ? groupState.groups.map(group => (<div key={group._id}>
      {group.name}
    </div>)) : NO_GROUPS;

    return (
      <div className='groups'>
        {groups}
        <AddGroup />
      </div>
    );
  }
}

export default Groups;
