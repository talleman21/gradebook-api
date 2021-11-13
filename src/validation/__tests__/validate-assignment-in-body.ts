import { getAssignmentBodyObject01 } from "../../sample-data";
import { validateAssignmentInBody } from "..";
import createError from "http-errors";

describe("validate-assignment-in-body", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any;

  beforeEach(() => {
    input = getAssignmentBodyObject01();
  });

  it("returns a validated assignment", async () => {
    //when
    const output = await validateAssignmentInBody(input);

    //then
    expect(output).toEqual(input);
  });

  it("rejects when unknown parameter passed", async () => {
    //when
    input.unknown = "unknown parameter";

    //then
    try {
      await validateAssignmentInBody(input);
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
        await validateAssignmentInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"name" is required'));
      }
    });

    it("rejects when name is number", async () => {
      //when
      input.name = 1;

      //then
      try {
        await validateAssignmentInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"name" must be a string'));
      }
    });
  });

  describe("validate description", () => {
    it("rejects when description not passed", async () => {
      //when
      input.description = undefined;

      //then
      try {
        await validateAssignmentInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"description" is required'));
      }
    });

    it("rejects when description is number", async () => {
      //when
      input.description = 1;

      //then
      try {
        await validateAssignmentInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"description" must be a string')
        );
      }
    });
  });

  describe("validate dueDate", () => {
    it("rejects when dueDate not passed", async () => {
      //when
      input.dueDate = undefined;

      //then
      try {
        await validateAssignmentInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"dueDate" is required'));
      }
    });

    it("rejects when dueDate is not a valid date", async () => {
      //when
      input.dueDate = "not a valid date";

      //then
      try {
        await validateAssignmentInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"dueDate" must be a valid date')
        );
      }
    });
  });

  describe("validate curriculumId", () => {
    it("rejects when curriculumId not passed", async () => {
      //when
      input.curriculumId = undefined;

      //then
      try {
        await validateAssignmentInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"curriculumId" is required'));
      }
    });

    it("rejects when curriculumId is number", async () => {
      //when
      input.curriculumId = 1;

      //then
      try {
        await validateAssignmentInBody(input);
      } catch (error) {
        expect(error).toEqual(
          createError(400, '"curriculumId" must be a string')
        );
      }
    });
  });
});
