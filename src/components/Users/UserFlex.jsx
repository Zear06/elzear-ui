import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import { Dimmer, Loader } from 'semantic-ui-react';
import './Users.css';
import USER_QUERY from '../../graphql/UserQuery.graphql';

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
    return this.props.render(user);
  }
}

export default ListItem;
