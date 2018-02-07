import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import type { OptionProps } from 'react-apollo';
import { graphql } from 'react-apollo';
import { Dimmer, Header, Loader } from 'semantic-ui-react';
import POLL_QUERY from '../../graphql/PollQuery.graphql';
import Candidates from './Candidates/Candidates';
import AddPrefs from './Candidates/AddPreferences';

type Props = OptionProps;

@graphql(POLL_QUERY, {
  options: props => ({
    variables: { key: props.match.params.pollKey }
  })
})
class User extends Component<Props> {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    const candidates = JSON.parse(data.poll.candidates) || [];
    const userPreference = data.poll.userPreference
      ? JSON.parse(data.poll.userPreference.ranking)
      : [];
    return (
      <div className='poll'>
        <Link to={`/${data.poll._to}`}>&laquo; {data.poll.group.name}</Link>
        <Header as='h1'>{data.poll.name}</Header>
        <Candidates pollKey={data.poll._key} candidates={candidates} />
        <AddPrefs
          pollKey={data.poll._key}
          candidates={candidates}
          myPrefs={userPreference}
        />
      </div>
    );
  }
}

export default User;
