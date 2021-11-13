import { getGradeBodyObject01 } from "../../sample-data";
import { validateGradeInBody } from "..";
import createError from "http-errors";

describe("validate-grade-in-body", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any;

  beforeEach(() => {
    input = getGradeBodyObject01();
  });

  it("returns a validated grade", async () => {
    //when
    const output = await validateGradeInBody(input);

    //then
    expect(output).toEqual(input);
  });

  it("rejects when unknown parameter passed", async () => {
    //when
    input.unknown = "unknown parameter";

    //then
    try {
      await validateGradeInBody(input);
    } catch (error) {
      expect(error).toEqual(createError(400, '"unknown" is not allowed'));
    }
  });

  describe("validate grade", () => {
    it("rejects when grade not passed", async () => {
      //when
      input.grade = undefined;

      //then
      try {
        await validateGradeInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"grade" is required'));
      }
    });

    it("rejects when grade is string", async () => {
      //when
      input.grade = "invalid string";

      //then
      try {
        await validateGradeInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"grade" must be a number'));
      }
    });
  });

  describe("validate studentId", () => {
    it("rejects when studentId not passed", async () => {
      //when
      input.studentId = undefined;

      //then
      try {
        await validateGradeInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"studentId" is required'));
      }
    });

    it("rejects when studentId is number", async () => {
      //when
      input.studentId = 1;

      //then
      try {
        await validateGradeInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"studentId" must be a string'));
      }
    });
  });

  describe("validate assignmentId", () => {
    it("rejects when assignmentId not passed", async () => {
      //when
      input.assignmentId = undefined;

      //then
      try {
        await validateGradeInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"assignmentId" is required'));
      }
    });

    it("rejects when assignmentId is number", async () => {
      //when
      input.assignmentId = 1;

      //then
      try {
        await validateGradeInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"assignmentId" must be a string')
        );
      }
    });
  });
});
