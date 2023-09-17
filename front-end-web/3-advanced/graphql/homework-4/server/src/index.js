import { createServer } from "node:http";
import { createYoga, createSchema, createPubSub } from "graphql-yoga";

import database from "@assets/data.json";

import resolvers from "@graphql/resolvers";
import typeDefs from "@graphql/types";

const pubsub = createPubSub();
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: { pubsub, database },
  graphqlEndpoint: "/",
});

const server = createServer(yoga);
server.listen(4000, () =>
  console.log("🚀  Server ready at http://localhost:4000")
);
