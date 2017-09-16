import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Dimmer, Loader } from 'semantic-ui-react';
import propTypes from 'prop-types';
import ListUsers from './ListUsers';
import './Users.css';
import USER_QUERY from '../../graphql/UserQuery.graphql';

@compose(graphql(USER_QUERY, {
  options: ({ users }) => {
    return ({
      variables: { key: `${users[0]._key}` },
    });
  }
}))
class UsersFromKeys extends Component {
  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Dimmer active>
          <Loader />
        </Dimmer>
      );
    }
    return (
      <div className='users'>
        <ListUsers users={data.users} />
      </div>
    );
  }
}

UsersFromKeys.propTypes = {
  data: propTypes.shape({
    loading: propTypes.bool,
    users: propTypes.arrayOf(propTypes.shape({
      _key: propTypes.string,
      name: propTypes.string,
      createdAt: propTypes.string,
      masterAuth: propTypes.string
    }))
  })
};
UsersFromKeys.defaultProps = {
  data: null
};

export default UsersFromKeys;
