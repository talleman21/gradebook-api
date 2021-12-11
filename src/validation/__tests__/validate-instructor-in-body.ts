import { getInstructorBodyObject01 } from "../../sample-data";
import { validateInstructorInBody } from "..";
import createError from "http-errors";

describe("validate-instructor-in-body", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any;

  beforeEach(() => {
    input = getInstructorBodyObject01();
  });

  it("returns a validated instructor", async () => {
    //when
    const output = await validateInstructorInBody(input);

    //then
    expect(output).toEqual(input);
  });

  it("rejects when unknown parameter passed", async () => {
    //when
    input.unknown = "unknown parameter";

    //then
    try {
      await validateInstructorInBody(input);
    } catch (error) {
      expect(error).toEqual(createError(400, '"unknown" is not allowed'));
    }
  });

  describe("validate userId", () => {
    it("rejects when userId not passed", async () => {
      //when
      input.userId = undefined;

      //then
      try {
        await validateInstructorInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"userId" is required'));
      }
    });

    it("rejects when userId is number", async () => {
      //when
      input.userId = 1;

      //then
      try {
        await validateInstructorInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"userId" must be a string'));
      }
    });
  });
});
