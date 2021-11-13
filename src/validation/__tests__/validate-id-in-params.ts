import { validateIdInParams } from "..";

describe("validate-id-in-params", () => {
  it("returns a valid id", async () => {
    const output = await validateIdInParams({ id: "test" });

    expect(output).toEqual("test");
  });
});
