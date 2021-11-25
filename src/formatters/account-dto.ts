import { RawAccount, AccountDTO } from "../types";

export const getAccountDTO = (
  account: RawAccount | null
): AccountDTO | null => {
  if (account) {
    return {
      id: account.id,
      name: account.name,
    };
  }
  return null;
};
