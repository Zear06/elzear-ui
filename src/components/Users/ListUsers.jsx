import React, { Component } from 'react';
import { Link } from 'react-router';

class ListUsers extends Component {
  render() {
    const users = this.props.users.map(user => (
      <div key={user._key}>
        <Link to={`/users/${user._key}`}>
          {user.name}
        </Link>
      </div>
    ));
    return (
      <div className='userlist'>
        {users}
      </div>
    );
  }
}

export default ListUsers;
