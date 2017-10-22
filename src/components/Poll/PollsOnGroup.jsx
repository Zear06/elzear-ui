import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dimmer, List, Loader } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import LIST_POLLS from '../../graphql/PollsQuery.graphql';

type Props = OptionProps;

@graphql(LIST_POLLS, {
  options: ({ groupKey }) => ({
    variables: { groupKey },
  })
})
class ListPollsOnGroup extends Component<Props> {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    const r = data.pollsOnGroup.map(poll => (

      <List.Item key={poll._key}>
        <List.Content>
          <List.Header
            as={Link}
            to={`/polls/${poll._key}`}
          >
            {poll.name}
          </List.Header>
        </List.Content>
      </List.Item>
    ));
    return (
      <List className='userlist'>
        {r.length ? r : 'No polls yet'}
      </List>
    );
  }
}

export default ListPollsOnGroup;
