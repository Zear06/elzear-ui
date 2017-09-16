import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { Dimmer, Image, List, Loader } from 'semantic-ui-react';
import './Users.css';
import USER_QUERY from '../../graphql/UserQuery.graphql';
import { profilePicUrl } from './utils';

@graphql(USER_QUERY, {
  options: ({ userKey }) => ({
    variables: { key: `${userKey}` },
  })
})
class ListItem extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    const { user } = data;
    return (
      <List.Item key={user._key}>
        <Image avatar src={profilePicUrl(user)} />
        <List.Content>
          <List.Header
            as={Link}
            to={`/users/${user._key}`}
          >
            {user.name}
          </List.Header>
        </List.Content>
      </List.Item>
    );
  }
}

export default ListItem;
