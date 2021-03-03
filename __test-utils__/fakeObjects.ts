import faker from "faker";

interface FakeUserObject {
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  password: string;
  artisan?: boolean;
}

export const fakeUser: FakeUserObject = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  artisan: false,
};
