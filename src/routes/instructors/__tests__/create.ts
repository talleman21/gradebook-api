import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getInstructor01,
  getInstructorBodyObject01,
  getInstructorDTO01,
} from "../../../sample-data";

describe("instructor-create", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawInstructor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instructorDTO: any;
  let createMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.body = getInstructorBodyObject01();
    rawInstructor = getInstructor01();
    instructorDTO = getInstructorDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    createMock = jest.spyOn(prisma.instructor, "create");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    createMock.mockResolvedValue(rawInstructor);
    await create(req, res, next);

    //then
    expect(createMock).toHaveBeenCalledWith({
      data: {
        name: req.body.name,
      },
      include: {
        curriculums: true,
      },
    });

    expect(resSend).toHaveBeenCalledWith(instructorDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.instructor, "create").mockRejectedValue("error");
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
