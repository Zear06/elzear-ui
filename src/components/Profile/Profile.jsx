import React, { Component } from 'react';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import { Card, Header } from 'semantic-ui-react';
import './Profile.css';
import Auth from './Auth';
import userState from '../../store/user';
import { validAuth } from '../../constants';
import AddAuth from './AddAuth';

@observer
class Profile extends Component {
  render() {
    if (userState.user === null) {
      return null;
    }
    const auths = userState.user.auths.map(auth => (<Auth key={auth.type} auth={auth} />));

    const usedAuths = auths.map(auth => auth.type);
    const remainingAuths = _.without(validAuth, usedAuths);
    const addAuths = remainingAuths.map(authName => (<AddAuth auth={authName} key={authName} />));

    return (
      <div className='profile'>
        <Card>
          <Card.Content>
            <Card.Header>
              {userState.user.username}
            </Card.Header>
            <Card.Meta>
              <span className='date'>{userState.user.createdAt}</span>
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
