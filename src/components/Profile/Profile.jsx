import React, { Component } from 'react';
import moment from 'moment';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import { Card, Dimmer, Header, Image, Loader, Message } from 'semantic-ui-react';
import * as _ from 'lodash';
import AddAuth from './AddAuth';
import Auth from './Auth';
import { validAuth } from '../../constants';
import USER_ME_QUERY from '../../graphql/UserMeQuery.graphql';
import { profilePicUrl } from '../Users/utils';

type Props = OptionProps;

@graphql(USER_ME_QUERY)
class Profile extends Component<Props> {
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

    const auths = data.me.auths.map(auth => (
      <Auth key={auth.type} master={data.me.masterAuth === auth.type} auth={auth} />
    ));
    const usedAuths = data.me.auths.map(auth => auth.type);
    const remainingAuths = _.difference(validAuth, usedAuths);
    const addAuths = remainingAuths.map(authName => (
      <AddAuth auth={authName} key={authName} refetch={data.refetch} />));
    return (
      <div className='profile'>
        <Card>
          <Image src={profilePicUrl(data.me, 300)} />
          <Card.Content>
            <Card.Header>
              {data.me.name}
            </Card.Header>
            <Card.Meta>
              <span className='date'>{moment(data.me.createdAt).calendar()}</span>
            </Card.Meta>
          </Card.Content>
        </Card>
        <Header size='medium'>Authentications</Header>
        {auths}
        {addAuths}
      </div>
    );
  }
}

export default Profile;
