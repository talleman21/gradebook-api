import { User } from "@prisma/client";
import { RawUser, UserDTO } from "../../types";

export const getUserBodyObject01 = (): Omit<User, "id"> => ({
  username: "TestUserUsername01",
  password: "TestUserPassword01",
  firstName: "TestUserFirstName01",
  lastName: "TestUserLastName01",
  accountId: "TestAccount01",
});

export const getUser01 = (): RawUser => ({
  id: "TestUser01",
  username: "TestUserUsername01",
  password: "TestUserPassword01",
  firstName: "TestUserFirstName01",
  lastName: "TestUserLastName01",
  accountId: "TestAccount01",
});

export const getUserDTO01 = (): UserDTO => ({
  id: "TestUser01",
  username: "TestUserUsername01",
  password: "TestUserPassword01",
  firstName: "TestUserFirstName01",
  lastName: "TestUserLastName01",
  accountId: "TestAccount01",
});
