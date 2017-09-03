import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import Sidebar from '../Sidebar/Sidebar';
import './App.css';
import UserState from './../../store/user';
import Header from './Header';

const App = (props) => {
  if (props.location.query.token) {
    UserState.loginFromToken(props.location.query.token);
  }
  return (
    <div className='elzear-app'>
      <Header />
      <Sidebar
        {...props}
      />
      <div className='elzear-body'>
        <Grid
          className='elzear-body-grid'
          columns={1}
          padded
        >
          {props.children}
        </Grid>
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.shape({
    query: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};
App.defaultProps = {
  children: null
};

export default App;
