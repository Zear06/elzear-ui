import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import './Sidebar.css';
import userState from '../../store/user';
import { Menu } from 'semantic-ui-react';

@observer
class Sidebar extends React.Component {
  render() {
    let profile = null;
    let login;
    if (userState.user === null) {
      login = (<Menu.Item
        as={Link}
        to='/login'
      >
        Login
      </Menu.Item>);
    } else {
      profile = (<Menu.Item
        as={Link}
        to='/profile'
      >
        Profile
      </Menu.Item>);
      login = (<Menu.Item
        onClick={() => userState.logout()}
        as={Link}
        to='/'
      >
        Logout
      </Menu.Item>);
    }
    return (
      <Menu vertical className='elzear-sidebar'>
        {profile}
        {login}
      </Menu>
    );
  }
}

Sidebar.contextTypes = {
  router: PropTypes.object.isRequired,
};
Sidebar.propTypes = {
  // user: PropTypes.object.isRequired
};

// Sidebar.contextTypes = {
//   router: React.PropTypes.func.isRequired
// };

export default Sidebar;
