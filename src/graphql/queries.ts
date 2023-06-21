import { gql } from "@apollo/client";

export const GET_ALL_TODOS = gql`
  query {
    listTodo {
      id
      title
      isActive
      createdAt
      updatedAt
    }
  }
`;
