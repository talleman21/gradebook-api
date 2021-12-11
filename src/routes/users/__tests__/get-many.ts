import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getUser01, getUserDTO01 } from "../../../sample-data";

describe("user-get-many", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawUser: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userDTO: any;
  let transactionMock: jest.SpyInstance;
  let findManyMock: jest.SpyInstance;
  let countMock: jest.SpyInstance;

  beforeEach(() => {
    rawUser = getUser01();
    userDTO = getUserDTO01();
    req.query = {};
    next = jest.fn();
    res.send = jest.fn();
    res.header = jest.fn();
    transactionMock = jest.spyOn(prisma, "$transaction");
    findManyMock = jest.spyOn(prisma.user, "findMany");
    countMock = jest.spyOn(prisma.user, "count").mockResolvedValue(1);
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object array", async () => {
    //given
    req.query._start = "0";
    req.query._end = "5";
    req.query._sort = "id";
    req.query._order = "desc";
    //when
    transactionMock.mockResolvedValue([1, [rawUser]]);
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      skip: 0,
      take: 5,
      orderBy: { id: "desc" },
      where: { AND: [] },
    });
    expect(countMock).toHaveBeenCalledWith();
    expect(res.header).toHaveBeenCalledWith("X-Total-Count", "1");
    expect(res.send).toHaveBeenCalledWith([userDTO]);
  });

  it("provides a filter if filter elements are present", async () => {
    //given
    req.query.username = "Bob";

    //when
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: { AND: [{ username: { in: ["Bob"], mode: "insensitive" } }] },
      orderBy: undefined,
    });
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
