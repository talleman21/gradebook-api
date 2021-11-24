import { RawUser, UserDTO } from "../types";

export const getUserDTO = (user: RawUser | null): UserDTO | null => {
  if (user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      accountId: user.accountId,
    };
  }
  return null;
};
