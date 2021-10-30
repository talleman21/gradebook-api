import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { assignment01 } from "../../../sample-data";
import createHttpError from "http-errors";

describe("assignment-create", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let errorCode: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let clientVersion: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let meta: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let error: any;

  beforeEach(() => {
    req.body = assignment01();
    delete req.body.id;
    next = jest.fn();
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with created assignment", async () => {
    //when
    jest.spyOn(prisma.assignment, "create").mockResolvedValue(assignment01());
    const myResponse = jest.spyOn(res, "send");
    await create(req, res, next);

    //then
    expect(myResponse).toHaveBeenCalledWith(assignment01());
    expect(true).toEqual(false);
  });

  it("rejects with a bad request error when missing required field", async () => {
    //given
    delete req.body.name;

    //when
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(
      createHttpError(400, '"name" is required')
    );
  });

  it("rejects with a bad request error when unknown field provided", async () => {
    //given
    req.body.unknownField = "unknown field";

    //when
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(
      createHttpError(400, '"unknownField" is not allowed')
    );
  });

  it("rejects with prisma known error when fkey not found", async () => {
    //given
    req.body.curriculumId = "invalid curriculum id";
    errorCode = "P2003";
    clientVersion = "3.2.1";
    meta = { field_name: "Assignment_curriculumId_fkey (index)" };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.assignment, "create").mockRejectedValue(error);
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });
});
