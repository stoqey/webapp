import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

let apolloClient;

const demoToken = 'stoqey.api.token.demo.hash';

function createApolloClient() {

  const isDev = process.env.NODE_ENV === 'development'? true : false;

  const devBaseUrl = `://192.168.2.26:3099/graphql`; // only for dev

  const backendUrl = !isDev? 'https://app.stoqey.com/graphql' : `http${devBaseUrl}`;
  const wsUrl = !isDev? 'wss://app.stoqey.com/graphql' : `ws${devBaseUrl}`;
  
  console.log('backend url is ', backendUrl);

  const httpLink = new HttpLink({
    uri: backendUrl, // Server URL (must be absolute)
  });


  const authLink = setContext((_, ctx) => {
    const headers = ctx && ctx.headers || {};
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: demoToken,
      }
    }
  });

  const wsLink = process.browser ? new WebSocketLink({ // if you instantiate in the server, the error will be thrown
    uri: wsUrl,
    options: {
      reconnect: true
    }
  }) : null;

  const link = process.browser ? split( 
    ({ query }) => {
      // @ts-ignore
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink),
  ) : authLink.concat(httpLink);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache(),
  });

}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
