import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh',
  // uri: 'http://localhost:5000/',
  cache: new InMemoryCache(),
});

export default client;
