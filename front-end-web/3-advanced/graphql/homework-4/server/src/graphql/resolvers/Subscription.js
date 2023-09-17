export const Subscription = {
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe("userCreated"),
  },
  eventCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe("eventCreated"),
  },
  participantAdded: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe("participantAdded"),
  },
};
