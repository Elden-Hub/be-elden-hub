import { Connection, createConnection } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const testConn = (drop: boolean = false): Promise<Connection> => {
  return createConnection({
    name: "default",
    type: "postgres",
    url: process.env.TEST_DATABASE_URL,
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../src/entity/*.*"],
    extra: {
      ssl: process.env.SSL || false,
    },
  });
};
