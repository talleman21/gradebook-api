import { getStudentBodyObject01 } from "../../sample-data";
import { validateStudentInBody } from "..";
import createError from "http-errors";

describe("validate-student-in-body", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any;

  beforeEach(() => {
    input = getStudentBodyObject01();
  });

  it("returns a validated student", async () => {
    //when
    const output = await validateStudentInBody(input);

    //then
    expect(output).toEqual(input);
  });

  it("rejects when unknown parameter passed", async () => {
    //when
    input.unknown = "unknown parameter";

    //then
    try {
      await validateStudentInBody(input);
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
        await validateStudentInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"userId" is required'));
      }
    });

    it("rejects when userId is number", async () => {
      //when
      input.userId = 1;

      //then
      try {
        await validateStudentInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"userId" must be a string'));
      }
    });
  });

  describe("validate curriculumIds", () => {
    it("rejects when curriculumIds not passed", async () => {
      //when
      input.curriculumIds = undefined;

      //then
      try {
        await validateStudentInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"curriculumIds" is required'));
      }
    });

    it("rejects when curriculumIds is number", async () => {
      //when
      input.curriculumIds = 1;

      //then
      try {
        await validateStudentInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"curriculumIds" must be an array')
        );
      }
    });

    it("rejects when curriculumIds is string", async () => {
      //when
      input.curriculumIds = "invalid string";

      //then
      try {
        await validateStudentInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"curriculumIds" must be an array')
        );
      }
    });

    it("rejects when curriculumIds array has invalid values", async () => {
      //when
      input.curriculumIds = [1];

      //then
      try {
        await validateStudentInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"curriculumIds[0]" must be a string')
        );
      }
    });
  });
});
