import { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import userState from './store/user';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3001/graphql'
});
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = userState.getToken();
    console.log('token', token);

    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
}]);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'Auth',
          possibleTypes: [
            { name: 'AuthLocal' },
            { name: 'AuthFb' }
          ],
        }, // this is just an example, put your own INTERFACE and UNION types here!
      ],
    },
  }
});
const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

const store = createStore(
  combineReducers({
    apollo: client.reducer()
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

export { client, store };
