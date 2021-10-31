import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getStudent01 } from "../../../sample-data";
import createHttpError from "http-errors";

describe("student-update", () => {
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
      name: "TestStudent01",
      subjectIds: ["TestSubject01"],
      instructorIds: ["TestInstructor01"],
    };
    req.params = { id: "1" };
    delete req.body.id;
    next = jest.fn();
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with updated student", async () => {
    //when
    const prismaResponse = jest
      .spyOn(prisma.student, "update")
      .mockResolvedValue(getStudent01());
    const updateResponse = jest.spyOn(res, "send");
    await updateOne(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        name: req.body.name,
        subjects: { connect: [{ id: "TestSubject01" }] },
        instructors: { connect: [{ id: "TestInstructor01" }] },
      },
      include: { subjects: true, instructors: true },
    });
    expect(updateResponse).toHaveBeenCalledWith(getStudent01());
  });

  it("rejects with a bad request error when missing required field", async () => {
    //given
    delete req.body.name;

    //when
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(
      createHttpError(400, '"name" is required')
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

  it("rejects with prisma known error when student id not found", async () => {
    //given
    req.params.id = "2";
    errorCode = "P2025";
    clientVersion = "3.2.1";
    meta = { cause: "Record to update not found." };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.student, "update").mockRejectedValue(error);
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });

  it("rejects with prisma known error when studentId not found", async () => {
    //given
    req.body.subjectIds = ["invalid subject id"];
    errorCode = "P2003";
    clientVersion = "3.2.1";
    meta = { field_name: "Student_subjectId_fkey (index)" };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.student, "update").mockRejectedValue(error);
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });

  it("rejects with prisma known error when instructorId not found", async () => {
    //given
    req.body.instructorIds = ["invalid instructor id"];
    errorCode = "P2003";
    clientVersion = "3.2.1";
    meta = { field_name: "Student_instructorId_fkey (index)" };
    error = { errorCode, clientVersion, meta };

    //when
    jest.spyOn(prisma.student, "update").mockRejectedValue(error);
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith(error);
  });
});
