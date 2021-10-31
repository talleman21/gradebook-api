import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getStudent01 } from "../../../sample-data";

describe("student-getMany", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  let getManyResponse: jest.SpyInstance;
  let prismaResponse: jest.SpyInstance;

  beforeEach(() => {
    next = jest.fn();
    getManyResponse = jest.spyOn(res, "send");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with array of students", async () => {
    //when
    prismaResponse = jest
      .spyOn(prisma.student, "findMany")
      .mockResolvedValue([getStudent01()]);

    await getMany(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      include: {
        instructors: true,
        subjects: true,
      },
    });

    expect(getManyResponse).toHaveBeenCalledWith([getStudent01()]);
  });

  it("responds with empty array if no students found", async () => {
    //when
    jest.spyOn(prisma.student, "findMany").mockResolvedValue([]);
    await getMany(req, res, next);

    //then
    expect(getManyResponse).toHaveBeenCalledWith([]);
  });
});
