import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import { Dimmer, Loader } from 'semantic-ui-react';
import ListUsers from './ListUsers';
import './Users.css';
import USER_QUERY from '../../graphql/UserQuery.graphql';

type Props = OptionProps;

@compose(graphql(USER_QUERY, {
  options: ({ users }) => ({
    variables: { key: `${users[0]._key}` },
  })
}))
class UsersFromKeys extends Component<Props> {
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
        <ListUsers users={data.users} />
      </div>
    );
  }
}

export default UsersFromKeys;
