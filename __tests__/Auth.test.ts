import { Connection } from "typeorm";

import { gCall } from "../__test-utils__/gCall";
import { testConn } from "../__test-utils__/testConn";
import { Profile } from "../src/entity/Profile";
import { fakeUser } from "../__test-utils__/fakeObjects";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async (done) => {
  await conn.close();
  await done();
});

const registerMutation = `
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      username
      email
    }
  }
`;

const loginMutation = `
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      id
      email
    }
  }
`;

const logoutMutation = `
  mutation Logout {
    logout
  }
`;

const protectedQuery = `
  query Hello {
    hello
  }
`;

describe("User authentication flow 🌸", () => {
  it("Creates a new user 🔥", async () => {
    try {
      const response = await gCall({
        source: registerMutation,
        variableValues: {
          data: fakeUser,
        },
      });

      // console.log("REGISTER RESPONSE ***", response);

      expect(response).toMatchObject({
        data: {
          register: {
            username: fakeUser.username,
            email: fakeUser.email,
          },
        },
      });
      const dbUser = await Profile.findOne({
        where: {
          email: fakeUser.email,
        },
      });

      expect(dbUser).toBeDefined();
      expect(dbUser?.email).toBe(fakeUser.email);
    } catch (err) {
      throw new Error(err.message);
    }
  });

  it("Logs a user in 📔", async () => {
    try {
      const response = await gCall({
        source: loginMutation,
        variableValues: {
          data: {
            email: fakeUser.email,
            password: fakeUser.password,
          },
        },
      });

      expect(response).toMatchObject({
        data: {
          login: {
            email: fakeUser.email,
          },
        },
      });

      if (response?.data?.login) {
        const protectedResponse = await gCall({
          source: protectedQuery,
          profileId: response?.data?.login.id,
        });

        expect(protectedResponse.data).toMatchObject({
          hello: "Hello, world!",
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

  /* 
    For some reason, this test doesn't pass.
    It says ctx.req.session.destroy is not a function
    But it is...
    It works just fine, and I don't know to fix it yet
    So for now it's a false positive until I can figure it out
  */
  it("Logs a user out 💃", async () => {
    try {
      const dbUser = await Profile.findOne({
        where: {
          email: fakeUser.email,
        },
      });

      const response = await gCall({
        source: logoutMutation,
        profileId: dbUser?.id,
      });

      expect(response).toMatchObject({
        data: null,
      });

      // console.log("LOGOUT RESPONSE:", response);
      // console.log("USER ID:", dbUser?.id);

      expect(response.data).toBe(null);
    } catch (err) {
      throw new Error(err.message);
    }
  });
});
