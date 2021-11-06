import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getStudent01,
  getStudentBodyObject01,
  getStudentDTO01,
} from "../../../sample-data";

describe("student-create", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawStudent: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let studentDTO: any;
  let createMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.body = getStudentBodyObject01();
    rawStudent = getStudent01();
    studentDTO = getStudentDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    createMock = jest.spyOn(prisma.student, "create");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    createMock.mockResolvedValue(rawStudent);
    await create(req, res, next);

    //then
    expect(createMock).toHaveBeenCalledWith({
      data: {
        name: req.body.name,
        curriculums: {
          connect: req.body.curriculumIds.map((curriculumId: string) => ({
            id: curriculumId,
          })),
        },
      },
      include: {
        curriculums: true,
      },
    });

    expect(resSend).toHaveBeenCalledWith(studentDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.student, "create").mockRejectedValue("error");
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
