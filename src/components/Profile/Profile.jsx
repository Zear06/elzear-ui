import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Profile.css';
import Auth from './Auth';

import userState from '../../store/user';
import { Card, Header } from 'semantic-ui-react';

@observer
class Profile extends Component {
  render() {
    if (userState.user === null) {
      return null;
    }
    const auths = userState.user.auths.map(auth => (<Auth key={auth.type} auth={auth} />));

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
      </div>
    );
  }
}

export default Profile;
