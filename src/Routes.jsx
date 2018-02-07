// @flow

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App/App';
import client from './ApolloSetup';

const Routes = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route path='/' component={App} />
    </BrowserRouter>
  </ApolloProvider>
);

export default Routes;
