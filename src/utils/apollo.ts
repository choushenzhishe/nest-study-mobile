import { InMemoryCache,ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from "./constants";

const httpLink =createHttpLink({
  uri:'//localhost:3000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});