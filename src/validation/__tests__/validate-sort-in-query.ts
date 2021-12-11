import { validateSortInQuery } from "..";
import createError from "http-errors";

describe("validate-sort-in-query", () => {
  const modelEnum = { id: "id", otherProperty: "otherProperty" };
  it("returns a valid sort object", async () => {
    const output = await validateSortInQuery<typeof modelEnum>(
      { _sort: "id", _order: "asc" },
      modelEnum
    );
    expect(output).toEqual({ id: "asc" });
  });

  it("returns undefined _order if _sort not provided", async () => {
    const output = await validateSortInQuery<typeof modelEnum>(
      { _order: "asc" },
      modelEnum
    );
    expect(output).toEqual(undefined);
  });

  it("throws error when invalid _order provided", async () => {
    try {
      await validateSortInQuery<typeof modelEnum>(
        { _sort: "id", _order: "invalid" },
        modelEnum
      );
    } catch (error) {
      expect(error).toEqual(
        createError(400, '"_order" must be one of [asc, desc]')
      );
    }
  });

  it("throws error when invalid _sort provided", async () => {
    try {
      await validateSortInQuery<typeof modelEnum>(
        { _sort: 1, _order: "asc" },
        modelEnum
      );
    } catch (error) {
      expect(error).toEqual(
        createError(400, '"_sort" must be one of [id, otherProperty]')
      );
    }
  });
});
