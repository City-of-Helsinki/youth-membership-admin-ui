import ApolloClient from 'apollo-boost';

import configService from '../config/configService';
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
  uri: configService.getConfig('REACT_APP_JASSARI_FEDERATION_GRAPHQL'),
});
