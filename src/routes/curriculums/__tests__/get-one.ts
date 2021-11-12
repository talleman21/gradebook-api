import { getOne } from "../get-one";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getCurriculum01, getCurriculumDTO01 } from "../../../sample-data";

describe("curriculum-get", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawCurriculum: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let curriculumDTO: any;
  let findUniqueMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    rawCurriculum = getCurriculum01();
    curriculumDTO = getCurriculumDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    findUniqueMock = jest.spyOn(prisma.curriculum, "findUnique");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    findUniqueMock.mockResolvedValue(rawCurriculum);
    await getOne(req, res, next);

    //then
    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { id: "1" },
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
    });
    expect(resSend).toHaveBeenCalledWith(curriculumDTO);
  });

  it("responds with null when id not found", async () => {
    //given
    req.params.id = "2";

    //when
    findUniqueMock.mockResolvedValue(null);
    await getOne(req, res, next);

    //then
    expect(resSend).toHaveBeenCalledWith(null);
  });
});
