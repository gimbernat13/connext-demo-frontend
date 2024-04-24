import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://api.thegraph.com/subgraphs/name/connext/amarok-runtime-v0-mainnet', 
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;