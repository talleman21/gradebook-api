import { validateSortInQuery } from "..";
import createError from "http-errors";

describe("validate-sort-in-query", () => {
  it("returns a valid sort object", async () => {
    const output = await validateSortInQuery({ _sort: "id", _order: "asc" });
    expect(output).toEqual({ field: "id", sortOrder: "asc" });
  });

  it("returns undefined _order if _sort not provided", async () => {
    const output = await validateSortInQuery({ _order: "asc" });
    expect(output).toEqual({ _sort: undefined, _order: undefined });
  });

  it("throws error when invalid _order provided", async () => {
    try {
      await validateSortInQuery({ _sort: "id", _order: "invalid" });
    } catch (error) {
      expect(error).toEqual(
        createError(400, '"_order" must be one of [ASC, DESC, asc, desc]')
      );
    }
  });

  it("throws error when invalid _sort provided", async () => {
    try {
      await validateSortInQuery({ _sort: 1, _order: "asc" });
    } catch (error) {
      expect(error).toEqual(createError(400, '"_sort" must be a string'));
    }
  });
});
