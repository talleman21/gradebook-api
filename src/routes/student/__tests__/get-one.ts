import { getOne } from "../get-one";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getStudent01 } from "../../../sample-data";

describe("student-get", () => {
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

  it("responds with valid student", async () => {
    //when
    const prismaResponse = jest
      .spyOn(prisma.student, "findUnique")
      .mockResolvedValue(getStudent01());
    await getOne(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where: { id: "1" },
      include: {
        instructors: true,
        subjects: true,
      },
    });
    expect(getResponse).toHaveBeenCalledWith(getStudent01());
  });

  it("responds with null when student id not found", async () => {
    //given
    req.params.id = "2";

    //when
    jest.spyOn(prisma.student, "findUnique").mockResolvedValue(null);
    await getOne(req, res, next);

    //then
    expect(getResponse).toHaveBeenCalledWith(null);
  });
});
