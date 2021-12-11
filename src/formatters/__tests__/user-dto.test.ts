import { getUser01, getUserDTO01 } from "../../sample-data";
import { getUserDTO } from "..";

describe("user-dto", () => {
  it("returns a valid dto object", () => {
    const output = getUserDTO(getUser01());
    expect(output).toEqual(getUserDTO01());
  });

  it("returns null if no user provided", () => {
    const output = getUserDTO(null);
    expect(output).toEqual(null);
  });
});
