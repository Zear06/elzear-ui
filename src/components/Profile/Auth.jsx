import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import USER_MUTATE from '../../graphql/UserMutate.graphql';
import userState from '../../store/user';

@withApollo
class Auth extends React.Component {
  makeMaster = () => {
    console.log('this.props', this.props);
    this.props.client.mutate({
      mutation: USER_MUTATE,
      variables: {
        payload: JSON.stringify({ masterAuth: this.props.auth.type })
      },
      update: (__, resp) => {
        userState.setToken(resp.data.userEdit.token);
      }
    });
  };

  render() {
    const { auth, master } = this.props;
    let button = null;
    if (master) {
      button = <Button disabled>This is your main profile</Button>;
    } else {
      button = (
        <Button onClick={this.makeMaster}>Use this as your main profile</Button>
      );
    }
    return (
      <div>
        {auth.type}
        {/* <Button></Button> */}
        {button}
      </div>
    );
  }
}

Auth.propTypes = {
  auth: PropTypes.shape({
    type: PropTypes.string
  }).isRequired,
  master: PropTypes.bool.isRequired
};

export default Auth;
