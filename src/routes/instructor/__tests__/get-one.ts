import { getOne } from "../get-one";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getInstructor01 } from "../../../sample-data";

describe("instructor-get", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  let getResponse: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    next = jest.fn();
    getResponse = jest.spyOn(res, "send");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with get instructor", async () => {
    //when
    const prismaResponse = jest
      .spyOn(prisma.instructor, "findUnique")
      .mockResolvedValue(getInstructor01());
    await getOne(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(getResponse).toHaveBeenCalledWith(getInstructor01());
  });

  it("responds with null when instructor id not found", async () => {
    //given
    req.params.id = "2";

    //when
    jest.spyOn(prisma.instructor, "findUnique").mockResolvedValue(null);
    await getOne(req, res, next);

    //then
    expect(getResponse).toHaveBeenCalledWith(null);
  });
});
