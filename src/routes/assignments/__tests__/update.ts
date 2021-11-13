import { updateOne } from "../update";
import { response, request } from "express";
import { prisma } from "../../../shared";
import {
  getAssignment01,
  getAssignmentBodyObject01,
  getAssignmentDTO01,
} from "../../../sample-data";

describe("assignment-update", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawAssignment: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let assignmentDTO: any;
  let updateMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    req.body = getAssignmentBodyObject01();
    rawAssignment = getAssignment01();
    assignmentDTO = getAssignmentDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    updateMock = jest.spyOn(prisma.assignment, "update");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid object", async () => {
    //when
    updateMock.mockResolvedValue(rawAssignment);
    await updateOne(req, res, next);

    //then
    expect(updateMock).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        name: req.body.name,
        description: req.body.description,
        dueDate: req.body.dueDate,
      },
      include: {
        grades: true,
      },
    });

    expect(resSend).toHaveBeenCalledWith(assignmentDTO);
  });

  it("calls next function when error encountered", async () => {
    //when
    jest.spyOn(prisma.assignment, "update").mockRejectedValue("error");
    await updateOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
