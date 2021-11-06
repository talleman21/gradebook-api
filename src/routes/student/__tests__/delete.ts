import { deleteOne } from "../delete";
import { response, request } from "express";
import { prisma } from "../../../shared";
import { getStudent01, getStudentDTO01 } from "../../../sample-data";

describe("student-delete", () => {
  const req = request;
  const res = response;
  let next: jest.Mock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawStudent: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let studentDTO: any;
  let deleteMock: jest.SpyInstance;
  let resSend: jest.SpyInstance;

  beforeEach(() => {
    req.params = { id: "1" };
    rawStudent = getStudent01();
    studentDTO = getStudentDTO01();
    next = jest.fn();
    resSend = jest.spyOn(res, "send");
    deleteMock = jest.spyOn(prisma.student, "delete");
  });

  afterAll(() => {
    prisma.$disconnect();
    jest.clearAllMocks();
  });

  it("responds with valid record", async () => {
    //when
    deleteMock.mockResolvedValue(rawStudent);
    await deleteOne(req, res, next);

    //then
    expect(deleteMock).toHaveBeenCalledWith({
      where: { id: "1" },
      include: {
        curriculums: true,
      },
    });
    expect(resSend).toHaveBeenCalledWith(studentDTO);
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
