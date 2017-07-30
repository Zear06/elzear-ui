import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar/Sidebar';
import logo from '../../logo.svg';
import './App.css';
import UserState from './../../store/user';

const App = (props) => {
  if (props.location.query.token) {
    UserState.loginFromToken(props.location.query.token);
  }

  return (
    <div className='elzear-app'>
      <div className='elzear-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h2>Welcome to React</h2>
      </div>
      <Sidebar
        {...props}
      />
      <div className='elzear-body'>
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    query: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};

export default App;
