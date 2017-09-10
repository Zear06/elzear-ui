import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Dimmer, Loader } from 'semantic-ui-react';
import propTypes from 'prop-types';
import ListUsers from './ListUsers';
import './Users.css';
import USERS_QUERY from '../../graphql/UsetList.graphql';

@graphql(USERS_QUERY)
class Users extends Component {
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

Users.propTypes = {
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
Users.defaultProps = {
  data: null
};

export default Users;
