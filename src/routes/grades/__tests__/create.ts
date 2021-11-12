import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getGrade01, getGradeBodyObject01 } from "../../../sample-data";

describe("grade-create", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawGrade: any;
  let createMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.body = getGradeBodyObject01();
    rawGrade = getGrade01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    createMock = jest.spyOn(prisma.grade, "create");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    createMock.mockResolvedValue(rawGrade);
    await create(req, res, next);

    //then
    expect(createMock).toHaveBeenCalledWith({
      data: {
        grade: req.body.grade,
        student: {
          connect: { id: req.body.studentId },
        },
        assignment: {
          connect: { id: req.body.assignmentId },
        },
      },
    });

    expect(resSend).toHaveBeenCalledWith(rawGrade);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.grade, "create").mockRejectedValue("error");
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
