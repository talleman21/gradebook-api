import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getCurriculum01 } from "../../../sample-data";

describe("curriculum-getMany", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  let getManyResponse: jest.SpyInstance;

  beforeEach(() => {
    next = jest.fn();
    getManyResponse = jest.spyOn(res, "send");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with array of curriculums", async () => {
    //when
    jest
      .spyOn(prisma.curriculum, "findMany")
      .mockResolvedValue([getCurriculum01()]);

    await getMany(req, res, next);

    //then
    expect(getManyResponse).toHaveBeenCalledWith([getCurriculum01()]);
  });

  it("responds with empty array if no curriculums found", async () => {
    //when
    jest.spyOn(prisma.curriculum, "findMany").mockResolvedValue([]);
    await getMany(req, res, next);

    //then
    expect(getManyResponse).toHaveBeenCalledWith([]);
  });
});
