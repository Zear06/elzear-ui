import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Card, Dimmer, Header, Image, Loader } from 'semantic-ui-react';
import * as _ from 'lodash';
import AddAuth from './AddAuth';
import Auth from './Auth';
import { validAuth } from '../../constants';
import USER_ME_QUERY from '../../graphql/UserMeQuery.graphql';

@graphql(USER_ME_QUERY)
class Profile extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
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
          <Image src={`http://api.adorable.io/avatar/200/${data.me.name}`} />
          <Card.Content>
            <Card.Header>
              {data.me.name}
            </Card.Header>
            <Card.Meta>
              <span className='date'>{data.me.createdAt}</span>
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
