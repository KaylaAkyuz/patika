export const Subscription = {
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe("userCreated"),
  },
  eventCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.subscribe("eventCreated"),
  },
  eventUpdated: {
    subscribe: (_, args, { pubsub }) => {
      const { id } = args;
      return pubsub.subscribe(`eventUpdated:${id}`);
    },
  },
  participantAdded: {
    subscribe: (_, args, { pubsub }) => {
      const { id } = args;
      return pubsub.subscribe(`participantAdded:${id}`);
    },
  },
};
