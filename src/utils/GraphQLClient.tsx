import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { PaginatedPost } from "../generated/graphql";
import { setContext } from '@apollo/client/link/context';
import LocalStorage from "./LocalStorage";
const domain = "https://server-webapp-mxh.herokuapp.com/";

const httpLink = createHttpLink({
  uri: `${domain}graphql`,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = LocalStorage.get('jwtToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const GraphQLClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getPosts: {
            keyArgs: [],
            merge(
              existing: PaginatedPost | undefined,
              incoming: PaginatedPost
            ): PaginatedPost {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
        },
      },
    },
  }),
});
