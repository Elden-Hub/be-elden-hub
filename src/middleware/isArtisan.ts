import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { MiddlewareFn } from "type-graphql";

export const isAdmin: MiddlewareFn<ExpressContext> = async (
  { context },
  next
) => {
  if (!context.req.session?.isAdmin) {
    throw new Error("User is not an admin! 💀");
  }

  return next();
};
