import gql from "graphql-tag";

export const ParticipantFragment = gql`
  fragment ParticipantFragment on Participant {
    id
    user_id
    event_id
  }
`;
