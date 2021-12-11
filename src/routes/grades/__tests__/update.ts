import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getGrade01, getGradeBodyObject01 } from "../../../sample-data";

describe("grade-update", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawGrade: any;
  let updateMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    req.body = getGradeBodyObject01();
    rawGrade = getGrade01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    updateMock = jest.spyOn(prisma.grade, "update");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    updateMock.mockResolvedValue(rawGrade);
    await updateOne(req, res, next);

    //then
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "1" },
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
    jest.spyOn(prisma.grade, "update").mockRejectedValue("error");
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
