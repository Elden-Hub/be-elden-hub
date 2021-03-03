import { graphql, GraphQLSchema } from "graphql";

import { createSchema } from "../src/createSchema";
import { Maybe } from "type-graphql";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  profileId?: string;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues, profileId }: Options) => {
  if (!schema) {
    schema = await createSchema();
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          profileId,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
};
