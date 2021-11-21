import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getCurriculum01, getCurriculumDTO01 } from "../../../sample-data";

describe("curriculum-get-many", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawCurriculum: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let curriculumDTO: any;
  let transactionMock: jest.SpyInstance;
  let findManyMock: jest.SpyInstance;
  let countMock: jest.SpyInstance;

  beforeEach(() => {
    rawCurriculum = getCurriculum01();
    curriculumDTO = getCurriculumDTO01();
    req.query = {};
    next = jest.fn();
    res.send = jest.fn();
    res.header = jest.fn();
    transactionMock = jest.spyOn(prisma, "$transaction");
    findManyMock = jest.spyOn(prisma.curriculum, "findMany");
    countMock = jest.spyOn(prisma.curriculum, "count").mockResolvedValue(1);
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
    transactionMock.mockResolvedValue([1, [rawCurriculum]]);
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      skip: 0,
      take: 5,
      orderBy: { id: "desc" },
      where: { AND: [] },
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
    });
    expect(countMock).toHaveBeenCalledWith();
    expect(res.header).toHaveBeenCalledWith("X-Total-Count", "1");
    expect(res.send).toHaveBeenCalledWith([curriculumDTO]);
  });

  it("provides a filter if filter elements are present", async () => {
    //given
    req.query.name = "Bob";

    //when
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      where: { AND: [{ name: { contains: "Bob", mode: "insensitive" } }] },
      orderBy: undefined,
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
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
