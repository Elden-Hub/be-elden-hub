import faker from "faker";

interface FakeUserObject {
  username: string;
  email: string;
  password: string;
}

export const fakeUser: FakeUserObject = {
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
