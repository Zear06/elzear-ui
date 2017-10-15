import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Dimmer, Image, List, Loader } from 'semantic-ui-react';
import './Users.css';
import USER_QUERY from '../../graphql/UserQuery.graphql';
import { profilePicUrl } from './utils';


type Props = OptionProps;

@graphql(USER_QUERY, {
  options: ({ userKey }) => ({
    variables: { key: `${userKey}` },
  })
})
class ListItem extends Component<Props> {
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
