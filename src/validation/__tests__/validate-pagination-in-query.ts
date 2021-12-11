import { validatePaginationInQuery } from "..";
import createError from "http-errors";

describe("validate-pagination-in-query", () => {
  it("returns a valid skip take object", async () => {
    const output = await validatePaginationInQuery({ _start: 5, _end: 10 });
    expect(output).toEqual({ skip: 5, take: 5 });
  });

  it("throws error when invalid _start or _end provided", async () => {
    try {
      await validatePaginationInQuery({ _end: -1, _start: -1 });
    } catch (error) {
      expect(error).toEqual(
        createError(400, '"_start" must be greater than or equal to 0')
      );
    }
  });
});
