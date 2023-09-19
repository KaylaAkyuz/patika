export const Subscription = {
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("userCreated"),
  },
  messageCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("messageCreated"),
  },
};
