import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getAssignment01,
  getAssignmentBodyObject01,
  getAssignmentDTO01,
} from "../../../sample-data";

describe("assignment-create", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawAssignment: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let assignmentDTO: any;
  let createMock: jest.SpyInstance;
  let getStudentsMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.body = getAssignmentBodyObject01();
    rawAssignment = getAssignment01();
    assignmentDTO = getAssignmentDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    getStudentsMock = jest.spyOn(prisma.curriculum, "findUnique");
    createMock = jest.spyOn(prisma.assignment, "create");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    getStudentsMock.mockResolvedValue({ students: [{ id: "TestStudent01" }] });
    createMock.mockResolvedValue(rawAssignment);
    await create(req, res, next);

    //then
    expect(getStudentsMock).toHaveBeenCalledWith({
      where: { id: req.body.curriculumId },
      select: { students: true },
    });
    expect(createMock).toHaveBeenCalledWith({
      data: {
        ...req.body,
        grades: {
          createMany: {
            data: [
              {
                grade: 0,
                studentId: "TestStudent01",
              },
            ],
          },
        },
      },
      include: {
        grades: true,
      },
    });

    expect(resSend).toHaveBeenCalledWith(assignmentDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.assignment, "create").mockRejectedValue("error");
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
