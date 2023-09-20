import gql from "graphql-tag";

export const GET_QUESTIONS = gql`
  query {
    questions {
      id
      text
    }
  }
`;

export const GET_QUESTION = gql`
  query ($id: ID!) {
    question(id: $id) {
      id
      text
      options {
        id
        text
        votes
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation ($text: String!, $id: ID!) {
    createQuestion(text: $text, id: $id) {
      id
      text
    }
  }
`;

export const CREATE_OPTION = gql`
  mutation ($text: String!, $poll_id: ID!) {
    createOption(text: $text, poll_id: $poll_id) {
      id
      text
      poll_id
      votes
    }
  }
`;

export const VOTE = gql`
  mutation ($questionId: ID!, $optionId: ID!) {
    vote(questionId: $questionId, optionId: $optionId) {
      id
      text
      options {
        id
        text
        votes
      }
    }
  }
`;

export const NEW_QUESTION_SUBSCRIPTION = gql`
  subscription {
    newQuestion {
      id
      text
    }
  }
`;

export const VOTE_SUBSCRIPTION = gql`
  subscription updatedQuestion($id: ID!) {
    updatedQuestion(id: $id) {
      id
      text
      options {
        id
        text
        votes
      }
    }
  }
`;
