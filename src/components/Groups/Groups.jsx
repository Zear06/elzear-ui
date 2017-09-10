import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Dimmer, Loader } from 'semantic-ui-react';
import './Groups.css';
import GROUPS_QUERY from '../../graphql/GroupListQuery.graphql';
import ListGroups from './ListGroups';
import AddGroup from './AddGroup';

@graphql(GROUPS_QUERY)
class Groups extends Component {
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
      <div className='groups'>
        <ListGroups groups={data.groups} />
        <AddGroup refetch={data.refetch} />
      </div>
    );
  }
}

export default Groups;
