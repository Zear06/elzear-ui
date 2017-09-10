import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { api } from '../../constants';
import userState from '../../store/user';
import AddAuthLocal from './AddAuthLocal';

const Auth = ({ auth, refetch }) => {
  if (auth === 'facebook') {
    return (
      <a href={`${api}/auth/facebook/add?token=${userState.token}`}>
        <Button color='facebook'>
          <Icon name='facebook' /> Add Facebook authentication
        </Button>
      </a>
    );
  } else if (auth === 'local') {
    return <AddAuthLocal refetch={refetch} />;
  }
  throw new Error('invalid auth');
};

Auth.propTypes = {
  auth: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired
};

export default Auth;
