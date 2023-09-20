import { createServer } from "node:http";
import { useServer } from "graphql-ws/lib/use/ws";
import { createYoga, createSchema } from "graphql-yoga";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { WebSocketServer } from "ws";
import db from "@assets/database.js";

import resolvers from "@graphql/resolvers";
import typeDefs from "@graphql/types";

const database = db;

const pubsub = new RedisPubSub();

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: { pubsub, database },
  graphqlEndpoint: "/",
  graphiql: {
    subscriptionsProtocol: "WS",
  },
});

const httpServer = createServer(yoga);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
});

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

httpServer.listen(4000, () =>
  console.log("🚀  Server ready at http://localhost:4000")
);
