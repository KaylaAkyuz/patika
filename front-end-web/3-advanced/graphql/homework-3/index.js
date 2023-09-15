const { createServer } = require("node:http");
const { createYoga, createSchema, createPubSub } = require("graphql-yoga");

const database = require("./data.json");

const typeDefs = /* GraphQL */ `
  type User {
    id: Int!
    username: String!
    email: String!
    events: [Event!]!
  }

  input UserInput {
    username: String!
    email: String!
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

  input EventInput {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: Int!
    user_id: Int!
  }

  type Location {
    id: Int!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input LocationInput {
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

  input ParticipantInput {
    user_id: Int!
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

  type DeleteAllOutput {
    count: Int!
  }

  type Mutation {
    addUser(input: UserInput!): User!
    updateUser(id: Int!, input: UserInput!): User!
    deleteUser(id: Int!): User!
    deleteAllUsers: DeleteAllOutput

    addEvent(input: EventInput!): Event!
    updateEvent(id: Int!, input: EventInput!): Event!
    deleteEvent(id: Int!): Event!
    deleteAllEvents: DeleteAllOutput

    addLocation(input: LocationInput!): Location!
    updateLocation(id: Int!, input: LocationInput!): Location!
    deleteLocation(id: Int!): Location!
    deleteAllLocations: DeleteAllOutput

    addParticipant(input: ParticipantInput!): Participant!
    updateParticipant(id: Int!, input: ParticipantInput!): Participant!
    deleteParticipant(id: Int!): Participant!
    deleteAllParticipants: DeleteAllOutput
  }

  type Subscription {
    userCreated: User!
    eventCreated: Event!
    participantAdded: Participant!
  }
`;

const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: (_, __, context) => context.pubsub.subscribe("userCreated"),
    },
    eventCreated: {
      subscribe: (_, __, context) => context.pubsub.subscribe("eventCreated"),
    },
    participantAdded: {
      subscribe: (_, __, context) =>
        context.pubsub.subscribe("participantAdded"),
    },
  },
  Query: {
    users: () => database.users,
    user: (_, args) => database.users.find((user) => user.id === args.id),
    events: () => database.events,
    event: (_, args) => database.events.find((event) => event.id === args.id),
    locations: () => database.locations,
    location: (_, args) =>
      database.locations.find((location) => location.id === args.id),
    participants: () => database.participants,
    participant: (_, args) =>
      database.participants.find((participant) => participant.id === args.id),
  },
  Mutation: {
    addUser: (_, args, context) => {
      const newUser = {
        id: database.users.length + 1,
        ...args.input,
      };

      database.users.push(newUser);

      context.pubsub.publish("userCreated", { userCreated: newUser });

      return newUser;
    },
    updateUser: (_, args) => {
      const user = database.users.find((user) => user.id === args.id);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedUser = {
        ...user,
        ...args.input,
      };
      database.users = database.users.map((user) =>
        user.id === args.id ? updatedUser : user
      );
      return updatedUser;
    },
    deleteUser: (_, args) => {
      const user = database.users.find((user) => user.id === args.id);
      if (!user) {
        throw new Error("User not found");
      }
      database.users = database.users.filter((user) => user.id !== args.id);
      return user;
    },
    deleteAllUsers: () => {
      const count = database.users.length;
      database.users = [];
      return { count };
    },
    addEvent: (_, args, context) => {
      const newEvent = {
        id: database.events.length + 1,
        ...args.input,
      };

      database.events.push(newEvent);

      context.pubsub.publish("eventCreated", { eventCreated: newEvent });

      return newEvent;
    },
    updateEvent: (_, args) => {
      const event = database.events.find((event) => event.id === args.id);
      if (!event) {
        throw new Error("Event not found");
      }
      const updatedEvent = {
        ...event,
        ...args.input,
      };
      database.events = database.events.map((event) =>
        event.id === args.id ? updatedEvent : event
      );
      return updatedEvent;
    },
    deleteEvent: (_, args) => {
      const event = database.events.find((event) => event.id === args.id);
      if (!event) {
        throw new Error("Event not found");
      }
      database.events = database.events.filter((event) => event.id !== args.id);
      return event;
    },
    deleteAllEvents: () => {
      const count = database.events.length;
      database.events = [];
      return { count };
    },
    addLocation: (_, args) => {
      const newLocation = {
        id: database.locations.length + 1,
        ...args.input,
      };
      database.locations.push(newLocation);
      return newLocation;
    },
    updateLocation: (_, args) => {
      const location = database.locations.find(
        (location) => location.id === args.id
      );
      if (!location) {
        throw new Error("Location not found");
      }
      const updatedLocation = {
        ...location,
        ...args.input,
      };
      database.locations = database.locations.map((location) =>
        location.id === args.id ? updatedLocation : location
      );
      return updatedLocation;
    },
    deleteLocation: (_, args) => {
      const location = database.locations.find(
        (location) => location.id === args.id
      );
      if (!location) {
        throw new Error("Location not found");
      }
      database.locations = database.locations.filter(
        (location) => location.id !== args.id
      );
      return location;
    },
    deleteAllLocations: () => {
      const count = database.locations.length;
      database.locations = [];
      return { count };
    },
    addParticipant: (_, args, context) => {
      const newParticipant = {
        id: database.participants.length + 1,
        ...args.input,
      };
      database.participants.push(newParticipant);

      context.pubsub.publish("participantAdded", {
        participantAdded: newParticipant,
      });

      return newParticipant;
    },
    updateParticipant: (_, args) => {
      const participant = database.participants.find(
        (participant) => participant.id === args.id
      );
      if (!participant) {
        throw new Error("Participant not found");
      }
      const updatedParticipant = {
        ...participant,
        ...args.input,
      };
      database.participants = database.participants.map((participant) =>
        participant.id === args.id ? updatedParticipant : participant
      );
      return updatedParticipant;
    },
    deleteParticipant: (_, args) => {
      const participant = database.participants.find(
        (participant) => participant.id === args.id
      );
      if (!participant) {
        throw new Error("Participant not found");
      }
      database.participants = database.participants.filter(
        (participant) => participant.id !== args.id
      );
      return participant;
    },
    deleteAllParticipants: () => {
      const count = database.participants.length;
      database.participants = [];
      return { count };
    },
  },
  User: {
    events: (parent) =>
      database.events.filter((event) => event.user_id === parent.id),
  },
  Event: {
    location: (parent) =>
      database.locations.find((location) => location.id === parent.location_id),
    participants: (parent) =>
      database.participants.filter(
        (participant) => participant.event_id === parent.id
      ),
    user: (parent) => database.users.find((user) => user.id === parent.user_id),
  },
  Location: {},
  Participant: {
    user: (parent) => database.users.find((user) => user.id === parent.user_id),
    event: (parent) =>
      database.events.find((event) => event.id === parent.event_id),
  },
};

const pubsub = createPubSub();
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: { pubsub },
  graphqlEndpoint: "/",
});

const server = createServer(yoga);
server.listen(4000, () =>
  console.log("🚀  Server ready at http://localhost:4000")
);
