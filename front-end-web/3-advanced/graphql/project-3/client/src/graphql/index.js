import gql from "graphql-tag";

export const SEND_MESSAGE_MUTATION = gql`
  mutation addMessage($input: MessageInput!) {
    addMessage(input: $input) {
      text
      userId
    }
  }
`;

export const GET_MESSAGES_QUERY = gql`
  query {
    messages {
      id
      text
      userId
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messageCreated {
      id
      text
      userId
    }
  }
`;

export const NEW_USER_MUTATION = gql`
  mutation addUser {
    addUser {
      id
    }
  }
`;
