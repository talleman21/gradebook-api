import { getMany } from "../get-many";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getInstructor01 } from "../../../sample-data";

describe("instructor-getMany", () => {
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

  it("responds with array of instructors", async () => {
    //when
    jest
      .spyOn(prisma.instructor, "findMany")
      .mockResolvedValue([getInstructor01()]);

    await getMany(req, res, next);

    //then
    expect(getManyResponse).toHaveBeenCalledWith([getInstructor01()]);
  });

  it("responds with empty array if no instructors found", async () => {
    //when
    jest.spyOn(prisma.instructor, "findMany").mockResolvedValue([]);
    await getMany(req, res, next);

    //then
    expect(getManyResponse).toHaveBeenCalledWith([]);
  });
});
