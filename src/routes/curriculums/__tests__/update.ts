import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getCurriculum01,
  getCurriculumBodyObject01,
  getCurriculumDTO01,
} from "../../../sample-data";

describe("curriculum-update", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawCurriculum: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let curriculumDTO: any;
  let updateMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    req.body = getCurriculumBodyObject01();
    rawCurriculum = getCurriculum01();
    curriculumDTO = getCurriculumDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    updateMock = jest.spyOn(prisma.curriculum, "update");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    updateMock.mockResolvedValue(rawCurriculum);
    await updateOne(req, res, next);

    //then
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        name: req.body.name,
        subject: { connect: { id: req.body.subjectId } },
        instructor: { connect: { id: req.body.instructorId } },
        students: { set: req.body.studentIds.map((id: string) => ({ id })) },
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
    jest.spyOn(prisma.curriculum, "update").mockRejectedValue("error");
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
