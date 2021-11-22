import { Account } from "@prisma/client";
import { RawAccount, AccountDTO } from "../../types";

export const getAccountBodyObject01 = (): Omit<Account, "id"> => ({
  name: "TestAssignment01",
  adminId: "TestUser01",
});

export const getAccount01 = (): RawAccount => ({
  id: "TestAccount01",
  name: "TestAccount01",
  adminId: "TestUser01",
});

export const getAccountDTO01 = (): AccountDTO => ({
  id: "TestAccount01",
  name: "TestAccount01",
  adminId: "TestUser01",
});
