import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';
import './Sidebar.css';
import userState from '../../store/user';
import { routes } from '../../utils';

@observer
class Sidebar extends React.Component {
  render() {
    const menuItemsJsx = Object.keys(routes).map((item) => {
      const { show, ...props } = routes[item];
      if (show(userState.user)) {
        return (
          <Menu.Item
            key={item}
            as={Link}
            {...props}
          />
        );
      }
      return null;
    });

    return (
      <Menu vertical className='elzear-sidebar'>
        {menuItemsJsx}
      </Menu>
    );
  }
}

Sidebar.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Sidebar;