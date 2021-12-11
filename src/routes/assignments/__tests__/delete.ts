import { deleteOne } from "../delete";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getAssignment01, getAssignmentDTO01 } from "../../../sample-data";

describe("assignment-delete", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawAssignment: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let assignmentDTO: any;
  let deleteMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    rawAssignment = getAssignment01();
    assignmentDTO = getAssignmentDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    deleteMock = jest.spyOn(prisma.assignment, "delete");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    deleteMock.mockResolvedValue(rawAssignment);
    await deleteOne(req, res, next);

    //then
    expect(deleteMock).toHaveBeenCalledWith({
      where: { id: "1" },
      include: {
        grades: true,
      },
    });
    expect(resSend).toHaveBeenCalledWith(assignmentDTO);
  });

  it("throws error when record not found", async () => {
    //given
    req.params.id = "2";

    //when
    deleteMock.mockRejectedValue("error");
    await deleteOne(req, res, next);

    //then
    expect(next).toHaveBeenCalledWith("error");
  });
});
