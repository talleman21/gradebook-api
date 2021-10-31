import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getSubject01 } from "../../../sample-data";

describe("subject-getMany", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let returnedSubject: any;
  let getManyResponse: jest.SpyInstance;
  let prismaResponse: jest.SpyInstance;

  beforeEach(() => {
    next = jest.fn();
    getManyResponse = jest.spyOn(res, "send");
    returnedSubject = getSubject01();
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with array of subjects", async () => {
    //when
    prismaResponse = jest
      .spyOn(prisma.subject, "findMany")
      .mockResolvedValue([returnedSubject]);

    await getMany(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      include: {
        students: true,
        curriculums: true,
      },
    });

    expect(getManyResponse).toHaveBeenCalledWith([returnedSubject]);
  });

  it("responds with empty array if no subjects found", async () => {
    //when
    jest.spyOn(prisma.subject, "findMany").mockResolvedValue([]);
    await getMany(req, res, next);

    //then
    expect(getManyResponse).toHaveBeenCalledWith([]);
  });
});
