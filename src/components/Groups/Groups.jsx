import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import { Dimmer, Loader, Message, Header } from 'semantic-ui-react';
import './Groups.css';
import GROUPS_QUERY from '../../graphql/GroupListQuery.graphql';
import ListGroups from './ListGroups';
import AddGroup from './AddGroup';

type Props = OptionProps;

@graphql(GROUPS_QUERY)
class Groups extends Component<Props> {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    if (data.error) {
      return (
        <Message error>
          <Message.Header>Error</Message.Header>
          <span style={{ whiteSpace: 'pre-line' }}>{data.error.message}</span>
        </Message>
      );
    }

    return (
      <div className='groups'>
        <Header>Member of</Header>
        <ListGroups groups={data.groups.filter(group => group.iAmIn)} />
        <Header>Other</Header>
        <ListGroups groups={data.groups.filter(group => !group.iAmIn)} />

        <AddGroup refetch={data.refetch} />
      </div>
    );
  }
}

export default Groups;
