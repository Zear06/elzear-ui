import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Users.css';
import usersState from '../../store/users';

const NO_USERS = (<div>No users</div>);

@observer
class Users extends Component {
  constructor() {
    super();
    usersState.getUsers();
  }

  render() {
    if (usersState.users === null) {
      return <div>NULL</div>;
    }
    const users = usersState.users ? usersState.users.map(user => (<div key={user._id}>
      {user.username}
    </div>)) : NO_USERS;

    return (
      <div className='users'>
        {users}
      </div>
    );
  }
}

export default Users;
