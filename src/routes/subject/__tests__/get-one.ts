import { getOne } from "../get-one";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getSubject01 } from "../../../sample-data";

describe("subject-get", () => {
  const req = request;
  const res = response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let next: any;
  let getResponse: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "TestSubject01" };
    next = jest.fn();
    getResponse = jest.spyOn(res, "send");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid subject", async () => {
    //when
    const prismaResponse = jest
      .spyOn(prisma.subject, "findUnique")
      .mockResolvedValue(getSubject01());
    await getOne(req, res, next);

    //then
    expect(prismaResponse).toHaveBeenCalledWith({
      where: { id: "TestSubject01" },
      include: {
        curriculums: true,
        students: true,
      },
    });
    expect(getResponse).toHaveBeenCalledWith(getSubject01());
  });

  it("responds with null when subject id not found", async () => {
    //given
    req.params.id = "2";

    //when
    jest.spyOn(prisma.subject, "findUnique").mockResolvedValue(null);
    await getOne(req, res, next);

    //then
    expect(getResponse).toHaveBeenCalledWith(null);
  });
});
