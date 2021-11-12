import { create } from "../create";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getSubject01,
  getSubjectBodyObject01,
  getSubjectDTO01,
} from "../../../sample-data";

describe("subject-create", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawSubject: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let subjectDTO: any;
  let createMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.body = getSubjectBodyObject01();
    rawSubject = getSubject01();
    subjectDTO = getSubjectDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    createMock = jest.spyOn(prisma.subject, "create");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    createMock.mockResolvedValue(rawSubject);
    await create(req, res, next);

    //then
    expect(createMock).toHaveBeenCalledWith({
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
    jest.spyOn(prisma.subject, "create").mockRejectedValue("error");
    await create(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
