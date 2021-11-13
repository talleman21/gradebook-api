import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getInstructor01, getInstructorDTO01 } from "../../../sample-data";

describe("instructor-get-many", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawInstructor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let instructorDTO: any;
  let findManyMock: jest.SpyInstance;

  beforeEach(() => {
    rawInstructor = getInstructor01();
    instructorDTO = getInstructorDTO01();
    next = jest.fn();
    res.send = jest.fn();
    res.header = jest.fn();
    findManyMock = jest.spyOn(prisma.instructor, "findMany");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object array", async () => {
    //when
    findManyMock.mockResolvedValue([rawInstructor]);
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      include: {
        curriculums: true,
      },
    });
    expect(res.send).toHaveBeenCalledWith([instructorDTO]);
  });

  it("responds with empty array if no records found", async () => {
    //when
    findManyMock.mockResolvedValue([]);
    await getMany(req, res, next);

    //then
    expect(res.send).toHaveBeenCalledWith([]);
  });

  it("calls next() if error thrown", async () => {
    //when
    findManyMock.mockRejectedValue("error");
    await getMany(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
