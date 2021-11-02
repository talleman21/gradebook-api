import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getGrade01 } from "../../../sample-data";

describe("grade-getMany", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let returnedGrade: any;
  let getManyResponse: jest.SpyInstance;
  let prismaResponse: jest.SpyInstance;

  beforeEach(() => {
    next = jest.fn();
    getManyResponse = jest.spyOn(res, "send");
    returnedGrade = getGrade01();
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with array of grades", async () => {
    //when
    prismaResponse = jest
      .spyOn(prisma.grade, "findMany")
      .mockResolvedValue([returnedGrade]);

    await getMany(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      include: {
        student: true,
        assignment: true,
      },
    });

    expect(getManyResponse).toHaveBeenCalledWith([returnedGrade]);
  });

  it("responds with empty array if no grades found", async () => {
    //when
    jest.spyOn(prisma.grade, "findMany").mockResolvedValue([]);
    await getMany(req, res, next);

    //then
    expect(getManyResponse).toHaveBeenCalledWith([]);
  });
});
