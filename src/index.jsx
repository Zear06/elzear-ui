import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './index.css';

function render(Component) {
  const container = document.getElementById('root');
  if (container === null) {
    throw new Error('Container not found');
  }
  ReactDOM.render(
    (
      <Component />
    ),
    container
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
