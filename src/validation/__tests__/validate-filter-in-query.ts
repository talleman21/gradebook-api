import { validateFilterInQuery } from "..";

describe("validate-filter-in-query", () => {
  const TestEnum = {
    name: "name",
    otherProperty: "otherProperty",
  };

  let query: { [index: string]: string | string[] };

  beforeEach(() => {
    query = {
      name: "Bob",
      otherProperty: ["I am otherProperty", "I am another otherProperty"],
    };
  });

  it("returns a valid filter object", async () => {
    const output = await validateFilterInQuery<typeof TestEnum>(
      query,
      TestEnum
    );
    expect(output).toEqual([
      { name: { in: ["Bob"], mode: "insensitive" } },
      {
        otherProperty: {
          in: ["I am otherProperty", "I am another otherProperty"],
          mode: "insensitive",
        },
      },
    ]);
  });

  it("returns a empty array when filters do not match", async () => {
    const output = await validateFilterInQuery(query, ["unmatchable property"]);
    expect(output).toEqual([]);
  });
});
