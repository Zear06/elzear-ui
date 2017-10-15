import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import type { QueryProps } from 'react-apollo';
import { api } from '../../constants';
import userState from '../../store/user';
import AddAuthLocal from './AddAuthLocal';

const Auth = ({ auth, refetch }: { auth: string, refetch: QueryProps.refetch }) => {
  if (auth === 'facebook') {
    return (
      <a href={`${api}/auth/facebook/add?token=${userState.token ? userState.token : ''}`}>
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

export default Auth;
