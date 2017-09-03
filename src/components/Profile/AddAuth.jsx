import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { api } from '../../constants';
import userState from '../../store/user';

const Auth = ({ auth }) => {
  if (auth === 'facebook') {
    return (
      <a href={`${api}/auth/facebook/add?token=${userState.token}`}>
        <Button color='facebook'>
          <Icon name='facebook' /> Add Facebook authentication
        </Button>
      </a>
    );
  } else if (auth === 'local') {
    return (
      <Form>
        <Input
          name='username'
          type='text'
          onChange={e => this.setUsername(e.target.value)}
        />
        <Input
          name='username'
          type='text'
          onChange={e => this.setPassword(e.target.value)}
        />
        <Button onClick={() => this.submit()}>Signup</Button>
      </Form>
    );
  }
};

Auth.propTypes = {
  auth: PropTypes.string.isRequired
};

export default Auth;
