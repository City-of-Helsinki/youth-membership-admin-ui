import ApolloClient from 'apollo-boost';

export default new ApolloClient({
  request: async (operation) => {
    const token = localStorage.getItem('apiToken');
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },
  uri: process.env.REACT_APP_PROFILE_GRAPHQL,
});
