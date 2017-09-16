import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Dimmer, Header, Loader } from 'semantic-ui-react';
import './Users.css';
import USER_QUERY from '../../graphql/UserQuery.graphql';

@graphql(USER_QUERY, {
  options: ({ params }) => ({
    variables: { key: `${params.userKey}` },
  })
})
class User extends Component {
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
      <div className='user'>
        <Header as='h1'>{data.user.name}</Header>
      </div>
    );
  }
}

export default User;
