import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import includes from "lodash/includes";
import AsyncStorageDB from "./AsyncStorageDB";

let apolloClient;

function createApolloClient() {
  const urlFromJson = process.env.NEXT_PUBLIC_API_URL;

  // console.log(
  //   "process.env.NEXT_PUBLIC_API_URL ----> ",
  //   process.env.NEXT_PUBLIC_API_URL
  // );

  let useHttps = false;

  if (includes(urlFromJson, ".co")) {
    useHttps = true;
  }

  const devBaseUrl = `://${urlFromJson}/graphql`;
  const backendUrl = `http${useHttps ? "s" : ""}${devBaseUrl}`;

  const wsUrl = `ws${useHttps ? "s" : ""}${devBaseUrl}`;

  // console.log("backend url is", backendUrl);

  const httpLink = new HttpLink({
    uri: backendUrl, // Server URL (must be absolute)
  });

  const authLink = setContext(async (_, ctx) => {
    const headers = (ctx && ctx.headers) || {};
    // console.log('<-----------> AuthContext <-----------> BEGIN ', getLastChar(token))
    const authorization = await AsyncStorageDB.getAuthToken();
    // console.log("<-----------> AuthContext <-----------> END ", authorization);

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${authorization}`,
      },
    };
  });

  const wsLink = process.browser
    ? new WebSocketLink({
        // if you instantiate in the server, the error will be thrown
        uri: wsUrl,
        options: {
          reconnect: true,
        },
      })
    : null;

  const link = process.browser
    ? split(
        ({ query }) => {
          // @ts-ignore
          const { kind, operation } = getMainDefinition(query);
          return kind === "OperationDefinition" && operation === "subscription";
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : authLink.concat(httpLink);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
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
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
