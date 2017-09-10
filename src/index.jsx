import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';

function render(Component) {
  ReactDOM.render(
    (
      <Component />
    ),
    document.getElementById('root')
  );
}

render(Routes);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./Routes').default;
    render(NextApp);
  });
}
