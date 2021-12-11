import { getAccount01, getAccountDTO01 } from "../../sample-data";
import { getAccountDTO } from "..";

describe("account-dto", () => {
  it("returns a valid dto object", () => {
    const output = getAccountDTO(getAccount01());
    expect(output).toEqual(getAccountDTO01());
  });

  it("returns null if no account provided", () => {
    const output = getAccountDTO(null);
    expect(output).toEqual(null);
  });
});
