import { getCurriculumBodyObject01 } from "../../sample-data";
import { validateCurriculumInBody } from "..";
import createError from "http-errors";

describe("validate-curriculum-in-body", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any;

  beforeEach(() => {
    input = getCurriculumBodyObject01();
  });

  it("returns a validated curriculum", async () => {
    //when
    const output = await validateCurriculumInBody(input);

    //then
    expect(output).toEqual(input);
  });

  it("rejects when unknown parameter passed", async () => {
    //when
    input.unknown = "unknown parameter";

    //then
    try {
      await validateCurriculumInBody(input);
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
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"name" is required'));
      }
    });

    it("rejects when name is number", async () => {
      //when
      input.name = 1;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"name" must be a string'));
      }
    });
  });

  describe("validate subjectId", () => {
    it("rejects when subjectId not passed", async () => {
      //when
      input.subjectId = undefined;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"subjectId" is required'));
      }
    });

    it("rejects when subjectId is number", async () => {
      //when
      input.subjectId = 1;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"subjectId" must be a string'));
      }
    });
  });

  describe("validate instructorId", () => {
    it("rejects when instructorId not passed", async () => {
      //when
      input.instructorId = undefined;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"instructorId" is required'));
      }
    });

    it("rejects when instructorId is number", async () => {
      //when
      input.instructorId = 1;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"instructorId" must be a string')
        );
      }
    });
  });

  describe("validate studentIds", () => {
    it("rejects when studentIds not passed", async () => {
      //when
      input.studentIds = undefined;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"studentIds" is required'));
      }
    });

    it("rejects when studentIds is number", async () => {
      //when
      input.studentIds = 1;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"studentIds" must be an array')
        );
      }
    });

    it("rejects when studentIds is string", async () => {
      //when
      input.studentIds = "invalid string";

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"studentIds" must be an array')
        );
      }
    });

    it("rejects when studentIds array has invalid values", async () => {
      //when
      input.studentIds = [1];

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"studentIds[0]" must be a string')
        );
      }
    });
  });

  describe("validate assignmentIds", () => {
    it("rejects when assignmentIds not passed", async () => {
      //when
      input.assignmentIds = undefined;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"assignmentIds" is required'));
      }
    });

    it("rejects when assignmentIds is number", async () => {
      //when
      input.assignmentIds = 1;

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"assignmentIds" must be an array')
        );
      }
    });

    it("rejects when assignmentIds is string", async () => {
      //when
      input.assignmentIds = "invalid string";

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"assignmentIds" must be an array')
        );
      }
    });

    it("rejects when assignmentIds array has invalid values", async () => {
      //when
      input.assignmentIds = [1];

      //then
      try {
        await validateCurriculumInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"assignmentIds[0]" must be a string')
        );
      }
    });
  });
});
