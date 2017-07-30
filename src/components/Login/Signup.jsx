import React from 'react';
import SignupLocal from './SignupLocal';
import './Login.css';
import { api } from '../../constants';
import { Button, Icon } from 'semantic-ui-react';

function Login() {
  return (
    <div className='login'>
      <SignupLocal />

      <a href={`${api}/auth/facebook/register`}>
        <Button color='facebook'>
          <Icon name='facebook' /> Facebook Register
        </Button>
      </a>

    </div>
  );
}


export default Login;
