import { Connection } from "typeorm";
import { testConn } from "../__test-utils__/testConn";
import { gCall } from "../__test-utils__/gCall";
import { Profile } from "../src/entity/Profile";
import { fakeUser } from "../__test-utils__/fakeObjects";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});

const currentUserQuery = `
  {
    me {
      id
      user
      email
    }
  }
`;

describe("Current User 👓", () => {
  it("Gets current user 🍷", async () => {
    const user = await Profile.create(fakeUser).save();

    const response = await gCall({
      source: currentUserQuery,
      profileId: user?.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: `${user.id}`,
          username: user.username,
          email: user.email,
        },
      },
    });
  });

  it("returns null 💀", async () => {
    const response = await gCall({
      source: currentUserQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
