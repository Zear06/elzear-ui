import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { Container, Message } from 'semantic-ui-react';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';
import UserState from './../../store/user';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.query.token) {
      UserState.setToken(props.location.query.token);
    }
  }

  render() {
    let error = null;
    if (_.has(this.props.location.query, 'error')) {
      const message = this.props.location.query.message || 'An error happened';
      error = (
        <Message error>
          <Message.Header>Error</Message.Header>
          <p>{message}</p>
        </Message>
      );
    }
    return (
      <div className='elzear-app'>
        <Header />
        <Sidebar />
        <Container className='elzear-body'>
          {error}
          {this.props.children}
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.shape({
    query: PropTypes.shape({
      token: PropTypes.string,
      error: PropTypes.bool,
      message: PropTypes.string
    })
  }).isRequired
};
App.defaultProps = {
  children: null
};

export default App;
