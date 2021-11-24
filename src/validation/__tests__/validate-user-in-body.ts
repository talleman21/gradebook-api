import { getUserBodyObject01 } from "../../sample-data";
import { validateUserInBody } from "..";
import createError from "http-errors";

describe("validate-user-in-body", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let input: any;

  beforeEach(() => {
    input = getUserBodyObject01();
  });

  it("returns a validated user", async () => {
    //when
    const output = await validateUserInBody(input);

    //then
    expect(output).toEqual(input);
  });

  it("rejects when unknown parameter passed", async () => {
    //when
    input.unknown = "unknown parameter";

    //then
    try {
      await validateUserInBody(input);
    } catch (error) {
      expect(error).toEqual(createError(400, '"unknown" is not allowed'));
    }
  });

  describe("validate firstName", () => {
    it("rejects when firstName not passed", async () => {
      //when
      input.firstName = undefined;

      //then
      try {
        await validateUserInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"firstName" is required'));
      }
    });

    it("rejects when firstName is number", async () => {
      //when
      input.firstName = 1;

      //then
      try {
        await validateUserInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"firstName" must be a string'));
      }
    });
  });

  describe("validate lastName", () => {
    it("rejects when lastName not passed", async () => {
      //when
      input.lastName = undefined;

      //then
      try {
        await validateUserInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"lastName" is required'));
      }
    });

    it("rejects when lastName is number", async () => {
      //when
      input.lastName = 1;

      //then
      try {
        await validateUserInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"lastName" must be a string'));
      }
    });
  });

  describe("validate accountId", () => {
    it("rejects when accountId not passed", async () => {
      //when
      input.accountId = undefined;

      //then
      try {
        await validateUserInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"accountId" is required'));
      }
    });

    it("rejects when accountId is number", async () => {
      //when
      input.accountId = 1;

      //then
      try {
        await validateUserInBody(input);
      } catch (error) {
        expect(error).toEqual(createError(400, '"accountId" must be a string'));
      }
    });
  });
});
