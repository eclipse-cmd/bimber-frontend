import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type BooleanStateResponse = {
  __typename?: 'BooleanStateResponse';
  errors?: Maybe<Array<FieldError>>;
  status?: Maybe<Scalars['Boolean']>;
};

export type CreateOrUpdatePostPayload = {
  id?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordPayload = {
  email: Scalars['String'];
};

export type LoginUserPayload = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  forgotPassword: BooleanStateResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  resetPassword: BooleanStateResponse;
};


export type MutationCreateOrUpdatePostArgs = {
  payload: CreateOrUpdatePostPayload;
};


export type MutationDeletePostArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  payload: ForgotPasswordPayload;
};


export type MutationLoginArgs = {
  payload: LoginUserPayload;
};


export type MutationRegisterArgs = {
  payload: RegisterUserPayload;
};


export type MutationResetPasswordArgs = {
  payload: ResetPasswordPayload;
};

export type Post = {
  __typename?: 'Post';
  created_at: Scalars['DateTime'];
  id: Scalars['String'];
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  auth?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};

export type RegisterUserPayload = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type ResetPasswordPayload = {
  password: Scalars['String'];
  password_confirmation: Scalars['String'];
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['String'];
  lastname: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, created_at: any };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, created_at: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type ForgotPasswordMutationVariables = Exact<{
  payload: ForgotPasswordPayload;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'BooleanStateResponse', status?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  payload: LoginUserPayload;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, created_at: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  payload: RegisterUserPayload;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, created_at: any } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ResetPasswordMutationVariables = Exact<{
  payload: ResetPasswordPayload;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'BooleanStateResponse', status?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = { __typename?: 'Query', auth?: { __typename?: 'User', id: string, firstname: string, lastname: string, email: string, created_at: any } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, title: string, created_at: any, updated_at: any }> };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  firstname
  lastname
  email
  created_at
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($payload: ForgotPasswordPayload!) {
  forgotPassword(payload: $payload) {
    status
    errors {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation login($payload: LoginUserPayload!) {
  login(payload: $payload) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($payload: RegisterUserPayload!) {
  register(payload: $payload) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation resetPassword($payload: ResetPasswordPayload!) {
  resetPassword(payload: $payload) {
    status
    errors {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const AuthDocument = gql`
    query auth {
  auth {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useAuthQuery(options?: Omit<Urql.UseQueryArgs<AuthQueryVariables>, 'query'>) {
  return Urql.useQuery<AuthQuery, AuthQueryVariables>({ query: AuthDocument, ...options });
};
export const PostsDocument = gql`
    query posts {
  posts {
    id
    title
    created_at
    updated_at
  }
}
    `;

export function usePostsQuery(options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery, PostsQueryVariables>({ query: PostsDocument, ...options });
};