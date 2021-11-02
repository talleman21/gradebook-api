import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getGrade01 } from "../../../sample-data";
import createHttpError from "http-errors";

describe("grade-create", () => {
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
    req.body = {
      grade: 97,
      studentId: "TestStudent01",
      assignmentId: "TestAssignment01",
    };
    next = jest.fn();
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with created grade", async () => {
    //when
    jest.spyOn(prisma.grade, "create").mockResolvedValue(getGrade01());
    const myResponse = jest.spyOn(res, "send");
    await create(req, res, next);

    //then
    expect(myResponse).toHaveBeenCalledWith(getGrade01());
  });

  it("rejects with a bad request error when missing required field", async () => {
    //given
    delete req.body.grade;

    //when
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(
      createHttpError(400, '"grade" is required')
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

  it("rejects with prisma known error when student fkey not found", async () => {
    //given
    req.body.studentId = "invalid student id";
    errorCode = "P2003";
    clientVersion = "3.2.1";
    meta = { field_name: "Grade_studentId_fkey (index)" };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.grade, "create").mockRejectedValue(error);
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });

  it("rejects with prisma known error when assignment fkey not found", async () => {
    //given
    req.body.assignmentId = "invalid assignment id";
    errorCode = "P2003";
    clientVersion = "3.2.1";
    meta = { field_name: "Grade_assignmentId_fkey (index)" };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.grade, "create").mockRejectedValue(error);
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });
});
