import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getStudent01, getStudentDTO01 } from "../../../sample-data";

describe("student-get-many", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawStudent: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let studentDTO: any;
  let findManyMock: jest.SpyInstance;

  beforeEach(() => {
    rawStudent = getStudent01();
    studentDTO = getStudentDTO01();
    next = jest.fn();
    res.send = jest.fn();
    res.header = jest.fn();
    findManyMock = jest.spyOn(prisma.student, "findMany");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object array", async () => {
    //when
    findManyMock.mockResolvedValue([rawStudent]);
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      include: {
        curriculums: true,
      },
    });
    expect(res.send).toHaveBeenCalledWith([studentDTO]);
  });

  it("responds with empty array if no records found", async () => {
    //when
    findManyMock.mockResolvedValue([]);
    await getMany(req, res, next);

    //then
    expect(res.send).toHaveBeenCalledWith([]);
  });
});
