import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { MiddlewareFn } from "type-graphql";

export const logger: MiddlewareFn<ExpressContext> = async ({ args }, next) => {
  console.log("args: ", args);

  return next();
};
