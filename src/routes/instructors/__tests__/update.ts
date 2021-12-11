import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getInstructor01,
  getInstructorBodyObject01,
  getInstructorDTO01,
} from "../../../sample-data";

describe("instructor-update", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawInstructor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instructorDTO: any;
  let updateMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    req.body = getInstructorBodyObject01();
    rawInstructor = getInstructor01();
    instructorDTO = getInstructorDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    updateMock = jest.spyOn(prisma.instructor, "update");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    updateMock.mockResolvedValue(rawInstructor);
    await updateOne(req, res, next);

    //then
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        userId: req.body.userId,
      },
      include: {
        curriculums: true,
        user: true,
      },
    });

    expect(resSend).toHaveBeenCalledWith(instructorDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.instructor, "update").mockRejectedValue("error");
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
