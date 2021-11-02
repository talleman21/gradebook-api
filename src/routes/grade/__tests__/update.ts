import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getGrade01 } from "../../../sample-data";
import createHttpError from "http-errors";

describe("grade-update", () => {
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
    req.params = { id: "TestGrade01" };
    delete req.body.id;
    next = jest.fn();
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with updated grade", async () => {
    //when
    const prismaResponse = jest
      .spyOn(prisma.grade, "update")
      .mockResolvedValue(getGrade01());
    const updateResponse = jest.spyOn(res, "send");
    await updateOne(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where: { id: "TestGrade01" },
      data: {
        grade: req.body.grade,
        student: { connect: { id: "TestStudent01" } },
        assignment: { connect: { id: "TestAssignment01" } },
      },
      include: { student: true, assignment: true },
    });
    expect(updateResponse).toHaveBeenCalledWith(getGrade01());
  });

  it("rejects with a bad request error when missing required field", async () => {
    //given
    delete req.body.grade;

    //when
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(
      createHttpError(400, '"grade" is required')
    );
  });

  it("rejects with a bad request error when unknown field provided", async () => {
    //given
    req.body.unknownField = "unknown field";

    //when
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(
      createHttpError(400, '"unknownField" is not allowed')
    );
  });

  it("rejects with prisma known error when grade id not found", async () => {
    //given
    req.params.id = "2";
    errorCode = "P2025";
    clientVersion = "3.2.1";
    meta = { cause: "Record to update not found." };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.grade, "update").mockRejectedValue(error);
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });

  it("rejects with prisma known error when studentId not found", async () => {
    //given
    req.body.studentId = "invalid student id";
    errorCode = "P2003";
    clientVersion = "3.2.1";
    meta = { field_name: "Grade_studentId_fkey (index)" };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.grade, "update").mockRejectedValue(error);
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });

  it("rejects with prisma known error when assignmentId not found", async () => {
    //given
    req.body.assignmentId = "invalid assignment id";
    errorCode = "P2003";
    clientVersion = "3.2.1";
    meta = { field_name: "Grade_assignmentId_fkey (index)" };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.grade, "update").mockRejectedValue(error);
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });
});
