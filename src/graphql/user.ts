import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUserInfo {
    getUserInfo {
      id
      name
      tel
      desc
      avatar
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $params: UserInput!) {
    updateUser(id: $id, params: $params) {
      code
      message
    }
  }
`;

export const LOGIN_BY_ACCOUNT = gql`
  mutation loginByAccount($account: String!, $password: String!) {
    loginByAccount(account: $account, password: $password) {
      code
      message
      data
    }
  }
`;

