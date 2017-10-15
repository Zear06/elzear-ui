import React from 'react';
import { Button } from 'semantic-ui-react';
import { withApollo } from 'react-apollo';
import type { MutationOpts } from 'react-apollo';
import USER_MUTATE from '../../graphql/UserMutate.graphql';
import userState from '../../store/user';

type Props = {
  auth: {},
  master: boolean
} & MutationOpts;

@withApollo
class Auth extends React.Component<Props> {
  makeMaster = () => {
    this.props.client.mutate({
      mutation: USER_MUTATE,
      variables: {
        payload: JSON.stringify({ masterAuth: this.props.auth.type })
      },
      update: (__, resp) => {
        userState.setTokenNoreset(resp.data.userEdit.token);
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

export default Auth;
