import {
  AuthDocument,
  AuthQuery,
  LoginMutation,
  Query,
  RegisterMutation,
  useAuthQuery,
} from "@/generated/generated";
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  cacheExchange,
  Cache,
  QueryInput,
  query,
} from "@urql/exchange-graphcache";
import type { AppProps } from "next/app";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";

//Chakra theme
const theme = extendTheme({
  colors: {},
});

//update query fn for cache
function newUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

// URQL client
const client = createClient({
  url: (process.env.NEXT_PUBLIC_GRAPHQL_URL as string) ?? "",
  fetchOptions: {
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            newUpdateQuery<LoginMutation, AuthQuery>(
              cache,
              { query: AuthDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                }

                return {
                  auth: result.login.user,
                };
              }
            );
          },
          register: (_result, args, cache, info) => {
            newUpdateQuery<RegisterMutation, AuthQuery>(
              cache,
              { query: AuthDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                }

                return {
                  auth: result.register.user,
                };
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
