import { getOne } from "../get-one";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getGrade01 } from "../../../sample-data";

describe("grade-get", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  let getResponse: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "TestGrade01" };
    next = jest.fn();
    getResponse = jest.spyOn(res, "send");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid grade", async () => {
    //when
    const prismaResponse = jest
      .spyOn(prisma.grade, "findUnique")
      .mockResolvedValue(getGrade01());
    await getOne(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where: { id: "TestGrade01" },
      include: {
        assignment: true,
        student: true,
      },
    });
    expect(getResponse).toHaveBeenCalledWith(getGrade01());
  });

  it("responds with null when grade id not found", async () => {
    //given
    req.params.id = "2";

    //when
    jest.spyOn(prisma.grade, "findUnique").mockResolvedValue(null);
    await getOne(req, res, next);

    //then
    expect(getResponse).toHaveBeenCalledWith(null);
  });
});
