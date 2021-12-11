import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getStudent01,
  getStudentBodyObject01,
  getStudentDTO01,
} from "../../../sample-data";

describe("student-update", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawStudent: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let studentDTO: any;
  let updateMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    req.body = getStudentBodyObject01();
    rawStudent = getStudent01();
    studentDTO = getStudentDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    updateMock = jest.spyOn(prisma.student, "update");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    updateMock.mockResolvedValue(rawStudent);
    await updateOne(req, res, next);

    //then
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        user: { connect: { id: req.body.userId } },
        curriculums: {
          connect: req.body.curriculumIds.map((curriculumId: string) => ({
            id: curriculumId,
          })),
        },
      },
      include: {
        curriculums: true,
        user: true,
      },
    });

    expect(resSend).toHaveBeenCalledWith(studentDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.student, "update").mockRejectedValue("error");
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
