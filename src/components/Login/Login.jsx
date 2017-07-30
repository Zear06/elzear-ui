import React from 'react';
import { Link } from 'react-router';
import LoginLocal from './LoginLocal';
import './Login.css';
import { api } from '../../constants';
import { Button, Divider, Icon } from 'semantic-ui-react';

function Login() {
  return (
    <div className='login'>
      <LoginLocal />

      <a href={`${api}/auth/facebook/login`}>
        <Button color='facebook'>
          <Icon name='facebook' /> Facebook Login
        </Button>
      </a>

      <Divider horizontal>Or</Divider>

      <Button as={Link} to='/signup'>
        Sign Up
      </Button>
    </div>
  );
}

export default Login;
