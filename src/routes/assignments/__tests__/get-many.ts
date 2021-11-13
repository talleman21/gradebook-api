import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getAssignment01, getAssignmentDTO01 } from "../../../sample-data";

describe("assignment-get-many", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawAssignment: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let assignmentDTO: any;
  let findManyMock: jest.SpyInstance;

  beforeEach(() => {
    rawAssignment = getAssignment01();
    assignmentDTO = getAssignmentDTO01();
    next = jest.fn();
    res.send = jest.fn();
    res.header = jest.fn();
    findManyMock = jest.spyOn(prisma.assignment, "findMany");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object array", async () => {
    //when
    findManyMock.mockResolvedValue([rawAssignment]);
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      include: {
        grades: true,
      },
    });
    expect(res.send).toHaveBeenCalledWith([assignmentDTO]);
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
