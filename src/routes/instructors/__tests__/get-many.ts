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
  let transactionMock: jest.SpyInstance;
  let findManyMock: jest.SpyInstance;
  let countMock: jest.SpyInstance;

  beforeEach(() => {
    rawInstructor = getInstructor01();
    instructorDTO = getInstructorDTO01();
    next = jest.fn();
    res.send = jest.fn();
    res.header = jest.fn();
    transactionMock = jest.spyOn(prisma, "$transaction");
    findManyMock = jest.spyOn(prisma.instructor, "findMany");
    countMock = jest.spyOn(prisma.instructor, "count");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object array", async () => {
    //when
    transactionMock.mockResolvedValue([1, [rawInstructor]]);
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      include: {
        curriculums: true,
      },
    });
    expect(countMock).toHaveBeenCalledWith();
    expect(res.header).toHaveBeenCalledWith("X-Total-Count", "1");
    expect(res.send).toHaveBeenCalledWith([instructorDTO]);
  });

  it("responds with empty array if no records found", async () => {
    //when
    transactionMock.mockResolvedValue([0, []]);
    await getMany(req, res, next);

    //then
    expect(res.send).toHaveBeenCalledWith([]);
  });

  it("calls next() if error thrown", async () => {
    //when
    transactionMock.mockRejectedValue("error");
    await getMany(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
