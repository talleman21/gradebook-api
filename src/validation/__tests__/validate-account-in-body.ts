import { getAccountBodyObject01 } from "../../sample-data";
import { validateAccountInBody } from "..";
import createError from "http-errors";

describe("validate-account-in-body", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any;

  beforeEach(() => {
    input = getAccountBodyObject01();
  });

  it("returns a validated account", async () => {
    //when
    const output = await validateAccountInBody(input);

    //then
    expect(output).toEqual(input);
  });

  it("rejects when unknown parameter passed", async () => {
    //when
    input.unknown = "unknown parameter";

    //then
    try {
      await validateAccountInBody(input);
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
        await validateAccountInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"name" is required'));
      }
    });

    it("rejects when name is number", async () => {
      //when
      input.name = 1;

      //then
      try {
        await validateAccountInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"name" must be a string'));
      }
    });
  });

  describe("validate adminId", () => {
    it("rejects when adminId not passed", async () => {
      //when
      input.adminId = undefined;

      //then
      try {
        await validateAccountInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"adminId" is required'));
      }
    });

    it("rejects when adminId is number", async () => {
      //when
      input.adminId = 1;

      //then
      try {
        await validateAccountInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"adminId" must be a string'));
      }
    });
  });
});
