const { ApolloServer, gql } = require("apollo-server");

const database = require("./data.json");

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Event {
    id: Int!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    participants: [Participant!]!
    location: Location!
    location_id: Int!
    user: User!
    user_id: Int!
  }

  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type Participant {
    id: Int!
    user: User!
    user_id: Int!
    event: Event!
    event_id: Int!
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
    events: [Event!]!
    event(id: Int!): Event
    locations: [Location!]!
    location(id: Int!): Location
    participants: [Participant!]!
    participant(id: Int!): Participant
  }
`;

const resolvers = {
  Query: {
    users: () => database.users,
    user: (parent, args, context, info) =>
      database.users.find((user) => user.id === args.id),
    events: () => database.events,
    event: (parent, args, context, info) =>
      database.events.find((event) => event.id === args.id),
    locations: () => database.locations,
    location: (parent, args, context, info) =>
      database.locations.find((location) => location.id === args.id),
    participants: () => database.participants,
    participant: (parent, args, context, info) =>
      database.participants.find((participant) => participant.id === args.id),
  },
  User: {
    events: (parent, args, context, info) =>
      database.events.filter((event) => event.user_id === parent.id),
  },
  Event: {
    location: (parent, args, context, info) =>
      database.locations.find((location) => location.id === parent.location_id),
    participants: (parent, args, context, info) =>
      database.participants.filter(
        (participant) => participant.event_id === parent.id
      ),
    user: (parent, args, context, info) =>
      database.users.find((user) => user.id === parent.user_id),
  },
  Location: {},
  Participant: {
    user: (parent, args, context, info) =>
      database.users.find((user) => user.id === parent.user_id),
    event: (parent, args, context, info) =>
      database.events.find((event) => event.id === parent.event_id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
