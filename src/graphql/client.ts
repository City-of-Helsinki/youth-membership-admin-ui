import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  request: async (operation) => {
    const tokens = localStorage.getItem('apiToken');

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
