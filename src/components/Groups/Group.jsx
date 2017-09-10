import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Dimmer, Loader } from 'semantic-ui-react';
import './Groups.css';
import GROUP_QUERY from '../../graphql/GroupQuery.graphql';

@graphql(GROUP_QUERY, {
  options: ({ params }) => ({
    variables: { key: `${params.groupKey}` },
  })
})
class Group extends Component {
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
      <div className='group'>
        {data.group.name}
      </div>
    );
  }
}

export default Group;
