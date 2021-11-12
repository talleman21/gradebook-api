import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getCurriculum01,
  getCurriculumBodyObject01,
  getCurriculumDTO01,
} from "../../../sample-data";

describe("curriculum-create", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawCurriculum: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let curriculumDTO: any;
  let createMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.body = getCurriculumBodyObject01();
    rawCurriculum = getCurriculum01();
    curriculumDTO = getCurriculumDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    createMock = jest.spyOn(prisma.curriculum, "create");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    createMock.mockResolvedValue(rawCurriculum);
    await create(req, res, next);

    //then
    expect(createMock).toHaveBeenCalledWith({
      data: {
        name: req.body.name,
        subject: { connect: { id: req.body.subjectId } },
        instructor: { connect: { id: req.body.instructorId } },
        students: {
          connect: req.body.studentIds.map((id: string) => ({ id })),
        },
      },
      include: {
        subject: true,
        instructor: true,
        students: true,
        assignments: true,
      },
    });

    expect(resSend).toHaveBeenCalledWith(curriculumDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.curriculum, "create").mockRejectedValue("error");
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
