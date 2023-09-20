export const Subscription = {
  newQuestion: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("newQuestion"),
  },
  newOption: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("newOption"),
  },
  updatedQuestion: {
    subscribe: (_, args, { pubsub }) =>
      pubsub.asyncIterator(`updatedQuestion:${args.id}`),
  },
};
