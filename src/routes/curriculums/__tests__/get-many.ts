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
  let findManyMock: jest.SpyInstance;

  beforeEach(() => {
    rawCurriculum = getCurriculum01();
    curriculumDTO = getCurriculumDTO01();
    next = jest.fn();
    res.send = jest.fn();
    res.header = jest.fn();
    findManyMock = jest.spyOn(prisma.curriculum, "findMany");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object array", async () => {
    //when
    findManyMock.mockResolvedValue([rawCurriculum]);
    await getMany(req, res, next);

    //then
    expect(findManyMock).toHaveBeenCalledWith({
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
    });
    expect(res.send).toHaveBeenCalledWith([curriculumDTO]);
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
