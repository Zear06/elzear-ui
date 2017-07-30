import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const Auth = ({ auth }) => {
  let button = null;
  if (auth.master) {
    button = <Button disabled>This is your main profile</Button>
  } else {
    button = (
      <Button>Use this as your main profile</Button>
    );
  }
  return (
    <div>
      {auth.type}
      {/*<Button></Button>*/}
      {button}
    </div>
  );
};

Auth.propTypes = {
  auth: PropTypes.shape({
    type: PropTypes.string
  }).isRequired
};

export default Auth;
