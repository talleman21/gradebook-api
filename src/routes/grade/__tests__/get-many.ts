import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getGrade01 } from "../../../sample-data";

describe("grade-get-many", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawGrade: any;
  let findManyMock: jest.SpyInstance;

  beforeEach(() => {
    rawGrade = getGrade01();
    next = jest.fn();
    res.send = jest.fn();
    res.header = jest.fn();
    findManyMock = jest.spyOn(prisma.grade, "findMany");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object array", async () => {
    //when
    findManyMock.mockResolvedValue([rawGrade]);
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({});
    expect(res.send).toHaveBeenCalledWith([rawGrade]);
  });

  it("responds with empty array if no records found", async () => {
    //when
    findManyMock.mockResolvedValue([]);
    await getMany(req, res, next);

    //then
    expect(res.send).toHaveBeenCalledWith([]);
  });
});
