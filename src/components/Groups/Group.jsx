import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import type { QueryProps } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Button, Container, Dimmer, Header, Image, List, Loader, Message } from 'semantic-ui-react';
import './Groups.css';
import GROUP_QUERY from '../../graphql/GroupQuery.graphql';
import GROUP_SELF_ACTION from '../../graphql/GroupSelfAction.graphql';
import AddComment from '../Comment/AddComment';
import ListComments from '../Comment/ListComments';
import { id2key } from '../../utils';
import { profilePicUrl } from '../Users/utils';
import UserFlex from '../Users/UserFlex';
import userState from '../../store/user';
import type { routedType } from '../flowDefs';

function renderU(groupUser) {
  return user => (
    <List.Item key={user._key}>
      <Image avatar src={profilePicUrl(user)} />
      <List.Content>
        <List.Header
          as={Link}
          to={`/users/${user._key}`}
        >
          {user.name}, {groupUser.type}
        </List.Header>
      </List.Content>
    </List.Item>
  );
}

type Props = routedType & QueryProps;

@compose(
  graphql(GROUP_QUERY, {
    options: props => ({
      variables: { key: props.match.params.groupKey },
    })
  }),
  graphql(GROUP_SELF_ACTION)
)
class Group extends Component<Props> {
  join() {
    this.props.mutate({
      variables: { groupKey: this.props.match.params.groupKey, action: 'join' }
    });
  }

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
    const users = data.group.groupUsers.map(groupUser => (
      <UserFlex
        key={groupUser.user._id}
        render={renderU(groupUser)}
        userKey={id2key(groupUser.user._id)}
      />
    ));

    const join = (
      <Button
        onClick={() => this.join()}
      >
        Join
      </Button>
    );

    let joinQuit = null;
    if (data.group.iAmIn) {
      joinQuit = null;
    } else if (userState.token && data.group.rqst < 3) {
      joinQuit = join;
    }
    return (
      <div className='group'>
        <Header as='h1'>{data.group.name}</Header>
        {joinQuit}

        <Container>
          {data.group.description}
        </Container>
        <Header as='h3' dividing>Users</Header>
        <List horizontal relaxed>
          {users}
        </List>

        <Header as='h3' dividing>Comments</Header>
        <ListComments targetType='groups' targetKey={data.group._key} />
        <AddComment targetType='groups' targetKey={data.group._key} />
      </div>
    );
  }
}

export default Group;
