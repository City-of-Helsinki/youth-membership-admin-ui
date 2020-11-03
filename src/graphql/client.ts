import ApolloClient from 'apollo-boost';

import authService from '../auth/authService';

export default new ApolloClient({
  request: async (operation) => {
    const tokens = authService.getTokens();

    if (tokens) {
      operation.setContext({
        headers: {
          'Api-Tokens': tokens,
        },
      });
    }
  },
  uri: process.env.REACT_APP_JASSARI_FEDERATION_GRAPHQL,
});
