import { getSubjectBodyObject01 } from "../../sample-data";
import { validateSubjectInBody } from "..";
import createError from "http-errors";

describe("validate-subject-in-body", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any;

  beforeEach(() => {
    input = getSubjectBodyObject01();
  });

  it("returns a validated subject", async () => {
    //when
    const output = await validateSubjectInBody(input);

    //then
    expect(output).toEqual(input);
  });

  it("rejects when unknown parameter passed", async () => {
    //when
    input.unknown = "unknown parameter";

    //then
    try {
      await validateSubjectInBody(input);
    } catch (error) {
      expect(error).toEqual(createError(400, '"unknown" is not allowed'));
    }
  });

  describe("validate name", () => {
    it("rejects when name not passed", async () => {
      //when
      input.name = undefined;

      //then
      try {
        await validateSubjectInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"name" is required'));
      }
    });

    it("rejects when name is number", async () => {
      //when
      input.name = 1;

      //then
      try {
        await validateSubjectInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"name" must be a string'));
      }
    });
  });
});
