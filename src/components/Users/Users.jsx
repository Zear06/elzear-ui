import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import { Dimmer, Header, Loader } from 'semantic-ui-react';
import ListUsers from './ListUsers';
import './Users.css';
import USERS_QUERY from '../../graphql/UsetList.graphql';

type Props = OptionProps;

@graphql(USERS_QUERY)
class Users extends Component<Props> {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    return (
      <div className='users'>
        <Header>
          Users
        </Header>
        <ListUsers users={data.users} />
      </div>
    );
  }
}

export default Users;
