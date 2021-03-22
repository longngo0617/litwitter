import {ApolloClient, InMemoryCache} from '@apollo/client';
const domain = 'https://server-webapp-mxh.herokuapp.com/';
export const GraphQLClient = new ApolloClient({
    uri: `${domain}graphql`,
    cache: new InMemoryCache()
});