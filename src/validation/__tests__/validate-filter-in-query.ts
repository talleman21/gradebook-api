import { validateFilterInQuery } from "..";

describe("validate-filter-in-query", () => {
  let query: { [index: string]: string };

  beforeEach(() => {
    query = { name: "Bob", otherProperty: "I am otherProperty" };
  });

  it("returns a valid filter object", async () => {
    const output = await validateFilterInQuery(query, [
      "name",
      "otherProperty",
    ]);
    expect(output).toEqual([
      { name: { contains: "Bob", mode: "insensitive" } },
      {
        otherProperty: { contains: "I am otherProperty", mode: "insensitive" },
      },
    ]);
  });

  it("returns a empty array when filters do not match", async () => {
    const output = await validateFilterInQuery(query, ["unmatchable property"]);
    expect(output).toEqual([]);
  });
});
