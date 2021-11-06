import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getSubject01,
  getSubjectBodyObject01,
  getSubjectDTO01,
} from "../../../sample-data";

describe("subject-update", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawSubject: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let subjectDTO: any;
  let updateMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    req.body = getSubjectBodyObject01();
    rawSubject = getSubject01();
    subjectDTO = getSubjectDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    updateMock = jest.spyOn(prisma.subject, "update");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    updateMock.mockResolvedValue(rawSubject);
    await updateOne(req, res, next);

    //then
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        name: req.body.name,
        curriculums: {
          connect: req.body.curriculums.map(({ id }: { id: string }) => ({
            id,
          })),
        },
      },
      include: {
        curriculums: true,
      },
    });

    expect(resSend).toHaveBeenCalledWith(subjectDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.subject, "update").mockRejectedValue("error");
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
