import {
  AuthDocument,
  AuthQuery,
  LoginMutation,
  LogoutMutation,
  RegisterMutation,
} from "@/generated/generated";
import urqlCacheUpdateQuery from "./urqlCacheUpdateQuery";
import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, fetchExchange } from "urql";

const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            urqlCacheUpdateQuery<LoginMutation, AuthQuery>(
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
            urqlCacheUpdateQuery<RegisterMutation, AuthQuery>(
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
          logout: (_result, args, cache, info) => {
            urqlCacheUpdateQuery<LogoutMutation, AuthQuery>(
              cache,
              { query: AuthDocument },
              _result,
              () => ({ auth: null })
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});

export default createUrqlClient;
